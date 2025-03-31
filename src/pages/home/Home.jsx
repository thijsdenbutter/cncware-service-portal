import './Home.css'
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";

function Home() {
    const dummyCompanies = [
        {
            id: "company-001",
            name: "Bouwbedrijf De Hamer",
            contact: {
                id: "contact-001",
                first_name: "Jan",
                last_name: "Jansen",
                email: "jan@dehamer.nl"
            },
            tickets: [
                {
                    id: "ticket-123",
                    subject: "Installatie probleem",
                    status: "open"
                },
                {
                    id: "ticket-124",
                    subject: "Factuurvraag",
                    status: "gesloten"
                }
            ]
        },
        {
            id: "company-002",
            name: "Interieurmakers BV",
            contact: {
                id: "contact-002",
                first_name: "Lisa",
                last_name: "de Vries",
                email: "lisa@interieurmakers.nl"
            },
            tickets: [
                {
                    id: "ticket-125",
                    subject: "Licentie probleem",
                    status: "open"
                }
            ]
        }
    ];


    return (
        <div className="home-layout">
            <CostumerTile dummyCompanies={dummyCompanies}/>
        </div>
    )
}

export default Home