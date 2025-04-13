import {createContext, useContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {findOrCreateCompanyInTeamleader} from "../helpers/findOrCreateCompanyInTeamleader.js";
import {TeamleaderContext} from "./TeamleaderContext.jsx";


export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [authError, setAuthError] = useState(null);
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    const { getValidTeamleaderAccessToken, fetchTicketStatuses, fetchCompanyCustomFields } = useContext(TeamleaderContext)

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

                console.log(response);

                const isAdmin = response.data.email.endsWith("@cncware.nl");

                setAuthState({
                    user: {
                        username: response.data.username,
                        email: response.data.email,
                        id: response.data.id,
                        role: isAdmin ? "admin" : "user",
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

    useEffect(() => {
        console.log(authState)
    }, [authState]);

    async function login({email, password}, navigate) {
        setAuthError(null);
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: email,
                password,
            });

            localStorage.setItem("user_token", response.data.accessToken);

            console.log(response.data);

            const isAdmin = response.data.email.endsWith("@cncware.nl");

            setAuthState({
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    role: isAdmin ? "admin" : "user",
                },
                status: "done",
            });

            const teamleaderToken = await getValidTeamleaderAccessToken();
            if (teamleaderToken) {
                await fetchTicketStatuses(teamleaderToken);
                await fetchCompanyCustomFields(teamleaderToken);
            }

            navigate("/")

        } catch (err) {
            console.error("❌ Login mislukt:", err);
            setAuthError("❌ Login mislukt")
        }
    }

    async function register({ email, password, company }) {
        try {

        const token = await getValidTeamleaderAccessToken();
        const companyId = await findOrCreateCompanyInTeamleader(company, email, token);

            const isAdmin = email.endsWith("@cncware.nl");

            const payload = {
                username: email,
                email,
                password,
                role: isAdmin ? ["admin"] : ["user"],
                info: companyId,
            };

            console.log("📤 Registratie payload:", payload);

            const response = await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                payload
            );

            console.log("✅ Backend response:", response);

            await login({ email, password });

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