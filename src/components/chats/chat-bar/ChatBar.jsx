import './ChatBar.css'
import ChatItem from "../chat-item/ChatItem.jsx";
import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";
import axios from "axios";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";

function ChatBar({selectedChatId, setSelectedChatId}) {
    const [chatsError, setChatsError] = useState(null);
    const [tickets, setTickets] = useState([]);
    const {
        filterData,

    } = useContext(FilterContext)
    const {
        getValidTeamleaderAccessToken
    } = useContext(TeamleaderContext);
    const {
        user
    } = useContext(AuthContext)

    async function fetchBaseTickets(token) {
        const isAdmin = user?.role === "admin"

        console.log(user.role);
        const requestBody = {
            page: {
                size: 50,
                number: 1,
            },
        };

        if (!isAdmin) {
            requestBody.filter = {
                relates_to: {
                    type: "company",
                    id: user.info,
                },
            };
        }

        console.log(requestBody);

        const response = await axios.post(
            "https://api.focus.teamleader.eu/tickets.list",
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data;
    }

    async function fetchContactInfo(contactId, token) {
        const response = await axios.post(
            "https://api.focus.teamleader.eu/contacts.info",
            {id: contactId},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data;
    }

    async function fetchCompanyInfo(companyId, token) {
        const response = await axios.post(
            "https://api.focus.teamleader.eu/companies.info",
            {id: companyId},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data;
    }

    async function fetchAndBuildTickets() {
        const token = await getValidTeamleaderAccessToken()

        if (!token) {
            setChatsError("Geen toegangstoken gevonden.");
            return;
        }

        try {
            const baseTickets = await fetchBaseTickets(token);

            const enrichedTickets = await Promise.all(
                baseTickets.map(async (ticket) => {
                    const customer = ticket.customer;
                    let customerInfo = null;
                    let companyInfo = {id: null, name: "Onbekend bedrijf"};

                    if (customer.type === "contact") {
                        customerInfo = await fetchContactInfo(customer.id, token);

                        if (customerInfo.company?.id) {
                            const fetchedCompany = await fetchCompanyInfo(customerInfo.company.id, token);
                            companyInfo = {
                                id: fetchedCompany.id,
                                name: fetchedCompany.name
                            };
                        }

                        return {
                            id: ticket.id,
                            status: ticket.status,
                            subject: ticket.subject,
                            customer: {
                                id: customerInfo.id,
                                name: `${customerInfo.first_name} ${customerInfo.last_name}`
                            },
                            company: companyInfo
                        };
                    }

                    if (customer.type === "company") {
                        customerInfo = await fetchCompanyInfo(customer.id, token);
                        return {
                            id: ticket.id,
                            status: ticket.status,
                            subject: ticket.subject,
                            customer: {
                                id: null,
                                name: null
                            },
                            company: {
                                id: customerInfo.id,
                                name: customerInfo.name
                            }
                        };
                    }

                    return {
                        id: ticket.id,
                        status: ticket.status,
                        subject: ticket.subject,
                        customer: {
                            id: customer.id,
                            name: "Onbekend"
                        },
                        company: companyInfo
                    };
                })
            );

            setTickets(enrichedTickets);
        } catch (err) {
            console.error("❌ Fout bij ophalen/verrijken tickets:", err);
            setChatsError("❌ Fout bij ophalen van de chats.");
        }
    }

    useEffect(() => {
        fetchAndBuildTickets();
    }, [])

    const filteredTickets = filterData(
        tickets,
        (ticket) => ticket.company.name,
        (ticket) => ticket.status.id
    );

    if (chatsError) return (
        <p>{chatsError}</p>
    )

    return (
        <div className="chats-bar">
            {filteredTickets.map((ticket) => {
                const isSelected = selectedChatId === ticket.id;
                return (
                    <ChatItem
                        key={ticket.id}
                        ticket={ticket}
                        isSelected={isSelected}
                        onClick={() => setSelectedChatId(ticket.id)}
                    />
                )
            })}
        </div>
    )
}

export default ChatBar;