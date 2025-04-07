import './Home.css'
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import valueOfCustomField from "../../helpers/valueOfCustomField.js";

function Home() {
    const [companies, setCompanies] = useState([]);
    const [ticketStatuses, setTicketStatuses] = useState([]);

    useEffect(() => {
        const fetchTicketStatuses = async () => {
            const token = localStorage.getItem("teamleader_token");

            if (!token) {
                console.error("⚠️ Geen toegangstoken gevonden.");
                return;
            }

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
                console.log(listOfStatuses)

                const statusList = listOfStatuses.map(status => ({
                    id: status.id,
                    name: status.status === "custom" ? status.label : status.status,
                }))

                setTicketStatuses(statusList);

            } catch (error) {
                console.error("❌ Fout bij ophalen bedrijven:", error);
                if (error.response?.status === 401) {
                    console.warn("🔑 Token is verlopen of ongeldig.");
                    // eventueel redirect naar login of token verwijderen
                }
            }
        }
        const fetchCompanies = async () => {
            const token = localStorage.getItem("teamleader_token");

            if (!token) {
                console.error("⚠️ Geen toegangstoken gevonden.");
                return;
            }

            try {
                const listResponse = await axios.post(
                    "https://api.focus.teamleader.eu/companies.list",
                    {
                        page: {
                            size: 50,
                            number: 1
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const baseCompanies = listResponse.data.data;

                const enrichedCompanies = await Promise.all(baseCompanies.map(async (company) => {
                    const companyId = company.id;

                    const [infoResponse, contactResponse, ticketsResponse] = await Promise.all([
                        axios.post(
                            "https://api.focus.teamleader.eu/companies.info",
                            {id: companyId},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        ),
                        axios.post(
                            "https://api.focus.teamleader.eu/contacts.list",
                            {filter: {company_id: companyId}},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        ),
                        axios.post(
                            "https://api.focus.teamleader.eu/tickets.list",
                            {
                                filter: {
                                    relates_to: {
                                        type: "company",
                                        id: companyId
                                    }
                                }
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        )
                    ]);
                    const fullCompany = infoResponse.data.data;
                    const contact = contactResponse.data.data;
                    const tickets = ticketsResponse.data.data

                    const supportMinutes = valueOfCustomField(fullCompany.custom_fields, "8e2add71-f057-0e99-8b56-0f3ae3684357");

                    return {
                        id: companyId,
                        name: fullCompany.name,
                        contact: contact[0],
                        supportMinutes: supportMinutes,
                        tickets: tickets,
                    };
                }));

                setCompanies(enrichedCompanies);

            } catch (error) {
                console.error("❌ Fout bij ophalen bedrijven:", error);
                if (error.response?.status === 401) {
                    console.warn("🔑 Token is verlopen of ongeldig.");
                    // eventueel redirect naar login of token verwijderen
                }
            }
        };

        fetchCompanies()
        fetchTicketStatuses()
    }, []);

    useEffect(() => console.log(companies), [companies]);


    return (
        <div className="home-layout">
            {companies.map((company) => {
                return (
                    <CostumerTile
                        key={company.id}
                        name={company.name}
                        contact={company.contact}
                        supportMinutes={company.supportMinutes}
                    />
                )
            })}
        </div>
    )
}

export default Home