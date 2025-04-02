import './Chats.css'
import InfoRow from "../../components/info-row/InfoRow.jsx";
import Divider from "../../components/divider/Divider.jsx";

function Chats() {
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
                },
                {
                    id: "msg-002",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Kunt u de foutmelding even sturen?",
                    created_at: "2024-04-01T10:03:00+02:00"
                },
                {
                    id: "msg-003",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Ja, er staat: 'Bestand niet gevonden'.",
                    created_at: "2024-04-01T10:05:00+02:00"
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
            created_at: "2024-03-28T14:00:00+02:00",
            messages: [
                {
                    id: "msg-004",
                    sender: {type: "contact", id: "contact-002", name: "Lisa de Vries"},
                    text: "Hoi, klopt het dat er extra kosten zijn gerekend?",
                    created_at: "2024-03-28T14:01:00+02:00"
                },
                {
                    id: "msg-005",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Ja, dat was voor de aanvullende installatie.",
                    created_at: "2024-03-28T14:05:00+02:00"
                },
                {
                    id: "msg-006",
                    sender: {type: "contact", id: "contact-002", name: "Lisa de Vries"},
                    text: "Ah, dan is het duidelijk. Dank!",
                    created_at: "2024-03-28T14:06:00+02:00"
                }
            ]
        }
    ];


    return (
        <div className="chats-layout">
            <div className="chats-bar">
                    {dummyTickets.map((ticket) => {
                        return (
                            <div key={ticket.id} className="chat">
                                <InfoRow label="Bedrijf" value={ticket.company.name}/>
                                <InfoRow label="Onderwerp" value={ticket.subject}/>
                                <Divider direction="horizontal"/>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Chats