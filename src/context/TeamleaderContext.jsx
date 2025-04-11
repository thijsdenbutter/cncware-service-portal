import {createContext, useState} from "react";
import axios from "axios";


export const TeamleaderContext = createContext({});

export function TeamleaderProvider({children}) {
    const [ticketStatuses, setTicketStatuses] = useState([]);
    const [customFieldsCompanies, setCustomFieldsCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getValidTeamleaderAccessToken() {
        const token = localStorage.getItem("teamleader_token");
        const refreshToken = localStorage.getItem("teamleader_refresh_token");
        const expiresAt = parseInt(localStorage.getItem("teamleader_token_expires_at") || "0");
        const now = Date.now();
        const buffer = 60 * 1000;

        if (token && now < expiresAt - buffer) {
            return token;
        }

        try {
            const res = await axios.post("http://localhost:3001/auth/refresh", {
                refresh_token: refreshToken
            });

            const newToken = res.data.access_token;
            const newRefresh = res.data.refresh_token;
            const newExpiresAt = Date.now() + (res.data.expires_in || 7200) * 1000;

            localStorage.setItem("teamleader_token", newToken);
            localStorage.setItem("teamleader_refresh_token", newRefresh);
            localStorage.setItem("teamleader_token_expires_at", newExpiresAt.toString());

            return newToken;
        } catch (err) {
            console.error("❌ Token verversen mislukt:", err);
            setError("Kon geen nieuwe toegangstoken ophalen.");
            return null;
        }
    }

    async function fetchTicketStatuses(token) {
        setIsLoading(true);
        try {
            const statusesResponse = await axios.post(
                "https://api.focus.teamleader.eu/ticketStatus.list",
                {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            const listOfStatuses = statusesResponse.data.data;

            const statusList = listOfStatuses.map(status => ({
                id: status.id,
                name: status.status === "custom" ? status.label : status.status,
            }))

            setTicketStatuses(statusList);

        } catch (error) {
            setError("❌ Fout bij ophalen ticket statussen");
            console.error("❌ Fout bij ophalen ticket statussen:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchCustomFields(token, contextFilter) {
        setIsLoading(true)
        try {
            const response = await axios.post(
                "https://api.focus.teamleader.eu/customFieldDefinitions.list",
                {
                    filter: {context: contextFilter}
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            return (response.data.data);

        } catch (error) {
            setError(`❌ Fout bij ophalen customfield: ${contextFilter}`)
            console.error(`❌ Fout bij ophalen customfield:, ${contextFilter}:`, error);
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchCompanyCustomFields(token) {
        const result = await fetchCustomFields(token, "company");
        if (result) {
            setCustomFieldsCompanies(result);
        }
    }

    return (
        <TeamleaderContext.Provider value={{
            fetchCompanyCustomFields,
            customFieldsCompanies,
            fetchTicketStatuses,
            ticketStatuses,
            error,
            setError,
            isLoading,
            getValidTeamleaderAccessToken
        }}>
            {children}
        </TeamleaderContext.Provider>
    )

}