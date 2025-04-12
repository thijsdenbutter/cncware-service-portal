import {createContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [authError, setAuthError] = useState(null);
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    function isTokenExpired(token) {
        try {
            const {exp} = jwtDecode(token);
            const now = Date.now() / 1000; // in seconden
            return exp < now;
        } catch (err) {
            console.error("❌ Token is ongeldig of niet decodeerbaar", err);
            setAuthError("❌ Token is ongeldig of niet decodeerbaar");
            return true; // behandel ongeldig token als verlopen
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

                setAuthState({
                    user: {
                        username: response.data.username,
                        email: response.data.email,
                        id: response.data.id,
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

    async function login({email, password}) {
        setAuthError(null);
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: email,
                password,
            });

            localStorage.setItem("user_token", response.data.accessToken);

            setAuthState({
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: "done",
            });
        } catch (err) {
            console.error("❌ Login mislukt:", err);
            setAuthError("❌ Login mislukt")
        }
    }

    async function register({ email, password, company }) {
        try {
            await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: email,
                email,
                password,
                role: ["user"],
                info: company,
            });

            await login({ email, password });

        } catch (err) {
            console.error("❌ Registratie mislukt:", err);
            setAuthError("❌ Registratie mislukt");
        }
    }

    function logout() {
        localStorage.removeItem("user_token");
        setAuthState({user: null, status: "done"});
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