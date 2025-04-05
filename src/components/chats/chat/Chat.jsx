import './Chat.css'
import ChatMessage from "../chat-message/ChatMessage.jsx";
import ChatNewMessage from "../chat-new-message/ChatNewMessage.jsx";

function Chat({selectedChatId}) {

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
                },
                {
                    id: "msg-004",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Kunt u controleren of de juiste map is geselecteerd?",
                    created_at: "2024-04-01T10:06:00+02:00"
                },
                {
                    id: "msg-005",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Welke map bedoelt u precies?",
                    created_at: "2024-04-01T10:07:00+02:00"
                },
                {
                    id: "msg-006",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "De map waar de installatiebestanden zijn uitgepakt.",
                    created_at: "2024-04-01T10:08:00+02:00"
                },
                {
                    id: "msg-007",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Ik zie daar geen bestanden staan eigenlijk.",
                    created_at: "2024-04-01T10:09:00+02:00"
                },
                {
                    id: "msg-008",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Dan is het mogelijk misgegaan bij het downloaden.",
                    created_at: "2024-04-01T10:10:00+02:00"
                },
                {
                    id: "msg-009",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Zal ik het opnieuw proberen te downloaden?",
                    created_at: "2024-04-01T10:11:00+02:00"
                },
                {
                    id: "msg-010",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Ja, dat is een goed idee.",
                    created_at: "2024-04-01T10:12:00+02:00"
                },
                {
                    id: "msg-011",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Oke, ik laat het u weten als het lukt.",
                    created_at: "2024-04-01T10:13:00+02:00"
                },
                {
                    id: "msg-012",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Top, ik hoor het graag.",
                    created_at: "2024-04-01T10:14:00+02:00"
                },
                {
                    id: "msg-013",
                    sender: {type: "contact", id: "contact-001", name: "Jan Jansen"},
                    text: "Het is gelukt, ik zie nu de installer.",
                    created_at: "2024-04-01T10:15:00+02:00"
                }
            ]
        }
        ,
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
                    id: "msg-004",
                    sender: {type: "contact", id: "contact-002", name: "Lisa de Vries"},
                    text: "Waarom zijn er extra kosten op de factuur?",
                    created_at: "2024-04-02T14:01:00+02:00"
                },
                {
                    id: "msg-005",
                    sender: {type: "user", id: "user-001", name: "Supportmedewerker"},
                    text: "Dat was voor de aanvullende installatie op locatie.",
                    created_at: "2024-04-02T14:03:00+02:00"
                },
                {
                    id: "msg-006",
                    sender: {type: "contact", id: "contact-002", name: "Lisa de Vries"},
                    text: "Dank voor de uitleg!",
                    created_at: "2024-04-02T14:04:00+02:00"
                }
            ]
        }
    ];

    const selectedTicket = dummyTickets.find(
        (ticket) => ticket.id === selectedChatId
    );

    return (
        <div className="chat-layout">
            <div className="chat-messages">
                {selectedTicket.messages.map((message) => {
                    return (
                        <ChatMessage
                            key={message.id}
                            message={message.text}
                            sender={message.sender}
                        />
                    )
                })}
            </div>
            <div>
                <ChatNewMessage
                    selectedChatId={selectedChatId}
                />
            </div>
        </div>
    )
}

export default Chat;