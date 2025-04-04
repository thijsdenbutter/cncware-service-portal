import './Chat.css'

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
        selectedTicket.messages.map((message) => {
            return (
                <div key={message.id}>{message.text}</div>
            )
        })
    )
}

export default Chat