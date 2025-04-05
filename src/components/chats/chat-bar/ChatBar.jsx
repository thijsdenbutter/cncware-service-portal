import './ChatBar.css'
import ChatItem from "../chat-item/ChatItem.jsx";
import {useContext} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";

function ChatBar({selectedChatId, setSelectedChatId}) {
    const dummyTickets = [
        {
            id: "ticket-001",
            subject: "Installatie probleem",
            status: "open",
            contact: {
                id: "contact-001",
                name: "Jan Jansen"
            },
            company: {
                id: "company-001",
                name: "Bouwbedrijf De Hamer"
            },
            created_at: "2024-04-01T10:00:00+02:00",
            messages: [
                {
                    id: "msg-001",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Hoi, ik krijg een foutmelding bij het installeren.",
                    created_at: "2024-04-01T10:01:00+02:00"
                }
            ]
        },
        {
            id: "ticket-002",
            subject: "Vraag over factuur",
            status: "gesloten",
            contact: {
                id: "contact-002",
                name: "Lisa de Vries"
            },
            company: {
                id: "company-002",
                name: "Interieurmakers BV"
            },
            created_at: "2024-04-02T14:00:00+02:00",
            messages: [
                {
                    id: "msg-002",
                    sender: {type: "contact", id: "contact-002", name: "Lisa de Vries"},
                    text: "Waarom zijn er extra kosten op de factuur?",
                    created_at: "2024-04-02T14:01:00+02:00"
                }
            ]
        },
        {
            id: "ticket-003",
            subject: "Licentie verlopen",
            status: "open",
            contact: {
                id: "contact-003",
                name: "Peter Klaassen"
            },
            company: {
                id: "company-003",
                name: "Meubelmakers & Co"
            },
            created_at: "2024-04-03T09:30:00+02:00",
            messages: []
        },
        {
            id: "ticket-004",
            subject: "Aanpassing gebruikersrechten",
            status: "gesloten",
            contact: {
                id: "contact-004",
                name: "Sanne Bakker"
            },
            company: {
                id: "company-004",
                name: "Houtbewerkers Zuid"
            },
            created_at: "2024-04-04T11:15:00+02:00",
            messages: []
        },
        {
            id: "ticket-005",
            subject: "Vraag over handleiding",
            status: "open",
            contact: {
                id: "contact-005",
                name: "Kevin van Dijk"
            },
            company: {
                id: "company-005",
                name: "Timmerbedrijf Noord"
            },
            created_at: "2024-04-05T08:45:00+02:00",
            messages: []
        },
        {
            id: "ticket-006",
            subject: "Probleem met bestandsupload",
            status: "gesloten",
            contact: {
                id: "contact-006",
                name: "Anouk Veenstra"
            },
            company: {
                id: "company-006",
                name: "CNC Profs"
            },
            created_at: "2024-04-06T16:20:00+02:00",
            messages: []
        }
    ];

    const {filterCostumer, filterStatus} = useContext(FilterContext)

    const filteredTickets = dummyTickets.filter((ticket) => {
        const matchCostumer = ticket.company.name
            .toLowerCase()
            .includes(filterCostumer.toLowerCase());

        const matchStatus =
            filterStatus === "" || ticket.status === filterStatus;

        return matchCostumer && matchStatus;
    });

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