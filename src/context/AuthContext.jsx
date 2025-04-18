import {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {findOrCreateCompanyInTeamleader} from "../helpers/teamleader/findOrCreateCompanyInTeamleader.js";
import {TeamleaderContext} from "./TeamleaderContext.jsx";
import {updateSupportMinutesForCompany} from "../helpers/teamleader/updateSupportMinutesForCompany.js";
import getCustomFieldIdByName from "../helpers/getCustomFieldIdByName.js";

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [authError, setAuthError] = useState(null);
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    const {
        getValidTeamleaderAccessToken,
        fetchTicketStatuses,
        fetchCompanyCustomFields,
    } = useContext(TeamleaderContext);

    function isTokenExpired(token) {
        try {
            const {exp} = jwtDecode(token);
            const now = Date.now() / 1000; // in seconden
            return exp < now;
        } catch (err) {
            console.error("❌ Token is ongeldig of niet decodeerbaar", err);
            setAuthError("❌ Token is ongeldig of niet decodeerbaar");
            return true;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("user_token");

        async function fetchUserData() {
            try {
                const response = await axios.get(
                    "https://frontend-educational-backend.herokuapp.com/api/user", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const isAdmin = response.data.email.endsWith("@cncware.nl");

                setAuthState({
                    user: {
                        username: response.data.username,
                        email: response.data.email,
                        id: response.data.id,
                        role: isAdmin ? "admin" : "user",
                        info: response.data.info,
                    },
                    status: "done",
                });
            } catch (err) {
                console.error("🔐 Gebruiker ophalen mislukt:", err);
                setAuthError("🔐 Gebruiker ophalen mislukt");

                localStorage.removeItem("user_token");
                setAuthState({user: null, status: "done"});
            }
        }

        if (token && !isTokenExpired(token)) {
            fetchUserData();
        } else {
            setAuthState({user: null, status: "done"});
        }

    }, []);

    async function login({email, password, navigate}) {
        setAuthError(null);
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: email,
                password,
            });

            const userToken = response.data.accessToken;
            localStorage.setItem("user_token", userToken);

            const userInfoRes = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const userData = userInfoRes.data;

            const isAdmin = userData.email.endsWith("@cncware.nl");

            console.log("response userData: ", userData);

            setAuthState({
                user: {
                    username: userData.username,
                    email: userData.email,
                    id: userData.id,
                    role: isAdmin ? "admin" : "user",
                    info: userData.info,
                },
                status: "done",
            });

            const teamleaderToken = await getValidTeamleaderAccessToken();
            if (teamleaderToken) {
                await fetchTicketStatuses(teamleaderToken);
                await fetchCompanyCustomFields(teamleaderToken);
            }

            navigate("/");

        } catch (err) {
            console.error("❌ Login mislukt:", err);
            setAuthError("❌ Login mislukt");
        }
    }

    async function register({email, password, company, navigate}) {
        try {
            const teamleaderToken = await getValidTeamleaderAccessToken();
            const fetchedCompanyId = await findOrCreateCompanyInTeamleader({
                companyName: company,
                email,
                token: teamleaderToken
            });

            const companyId = fetchedCompanyId.id;

            const isAdmin = email.endsWith("@cncware.nl");

            const payload = {
                username: email,
                email,
                password,
                role: isAdmin ? ["admin"] : ["user"],
            };

            await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                payload,
            );

            await login({email, password, navigate});

            const userToken = localStorage.getItem("user_token");

            const responsePutInfo = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user", {
                info: companyId,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });

            setAuthState({
                user: {
                    username: responsePutInfo.data.username,
                    email: responsePutInfo.data.email,
                    id: responsePutInfo.data.id,
                    role: isAdmin ? "admin" : "user",
                    info: responsePutInfo.data.info,
                },
                status: "done",
            });

            if (fetchedCompanyId.type === "new") {
                const customFieldsCompanies = await fetchCompanyCustomFields();
                const customFieldId = getCustomFieldIdByName(customFieldsCompanies, "Support minuten");
                await updateSupportMinutesForCompany({
                    token: teamleaderToken,
                    companyId: companyId,
                    customFieldId,
                    newValue: 100
                });
            }
        } catch (err) {
            console.error("❌ Registratie mislukt:", err);
            setAuthError("❌ Registratie mislukt");
        }
    }

    function logout(navigate) {
        localStorage.clear();
        setAuthState({user: null, status: "done"});
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{
            user: authState.user,
            status: authState.status,
            authError,
            setAuthError,
            isAuthenticated: !!authState.user,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}