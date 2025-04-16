import {createContext, useState} from "react";
import axios from "axios";
import {fetchCustomFields} from "../helpers/teamleader/fetchCustomFields.js";
import { fetchTicketStatuses as fetchTicketStatusesFromAPI } from "../helpers/teamleader/fetchTicketStatuses.js";


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

    async function fetchTicketStatuses() {

        const token = await getValidTeamleaderAccessToken();

        setIsLoading(true);
        try {
            const statusList = await fetchTicketStatusesFromAPI(token);
            setTicketStatuses(statusList);
        } catch (error) {
            setError("❌ Fout bij ophalen ticket statussen");
            console.error("❌ Fout bij ophalen ticket statussen:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchCompanyCustomFields() {

        const token = await getValidTeamleaderAccessToken();

        if (!token) return;

        setIsLoading(true);
        try {
            const result = await fetchCustomFields(token, "company");
            if (result) {
                setCustomFieldsCompanies(result);
            }
        } catch (error) {
            console.error("❌ Fout bij ophalen customfields:", error);
            setError("❌ Fout bij ophalen customfields: company");
        } finally {
            setIsLoading(false);
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