import './ChatBar.css'
import ChatItem from "../chat-item/ChatItem.jsx";
import {useContext, useEffect, useState} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {TimerContext} from "../../../context/TimerContext.jsx";
import {fetchTicketList} from "../../../helpers/teamleader/fetchTicketList.js";
import {fetchContactInfo} from "../../../helpers/teamleader/fetchContactInfo.js";
import {fetchCompanyInfo} from "../../../helpers/teamleader/fetchCompanyInfo.js";

function ChatBar() {
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
    const {
        setSelectedChat
    } = useContext(TimerContext)

    async function fetchAndBuildTickets() {
        const token = await getValidTeamleaderAccessToken()

        if (!token) {
            setChatsError("Geen toegangstoken gevonden.");
            return;
        }

        try {
            let filter = null;
            const isAdmin = user?.role === "admin";
            if (!isAdmin) filter = user?.info;

            const baseTickets = await fetchTicketList(token, filter);

            const enrichedTickets = await Promise.all(
                baseTickets.map(async (ticket) => {
                    const customer = ticket.customer;
                    let customerInfo = null;
                    let companyInfo = {id: null, name: "Onbekend bedrijf"};

                    if (customer.type === "contact") {
                        customerInfo = await fetchContactInfo(token, customer.id);

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
                        customerInfo = await fetchCompanyInfo(token, customer.id);
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
            {filteredTickets.reverse().map((ticket) => {
                return (
                    <ChatItem
                        key={ticket.id}
                        ticket={ticket}
                        onClick={() => setSelectedChat({
                            id:ticket.id,
                            company:ticket?.company ? ticket.company : null
                        })}
                    />
                )
            })}
        </div>
    )
}

export default ChatBar;