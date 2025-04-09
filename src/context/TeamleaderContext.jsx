import {createContext, useState} from "react";
import axios from "axios";


export const TeamleaderContext = createContext({});

export function TeamleaderProvider({children}) {
    const [teamleaderDataIsLoaded, setTeamleaderDataIsLoaded] = useState(false);
    const [ticketStatuses, setTicketStatuses] = useState([]);
    const [customFieldsCompanies, setCustomFieldsCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            teamleaderDataIsLoaded,
            setTeamleaderDataIsLoaded,
            fetchCompanyCustomFields,
            customFieldsCompanies,
            fetchTicketStatuses,
            ticketStatuses,
            error,
            setError,
            isLoading
        }}>
            {children}
        </TeamleaderContext.Provider>
    )

}