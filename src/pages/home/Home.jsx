import NavBar from "../../components/navBar/NavBar.jsx";
import './Home.css'
import InfoRow from "../../components/info-row/InfoRow.jsx";

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
            <div className="tile-costumer">
                <InfoRow label="Bedrijfsnaam" value={dummyCompanies[0].name} />
                <InfoRow label="Contact" value={dummyCompanies[0].contact.first_name + " " + dummyCompanies[0].contact.last_name} />
                <div className="tile-quanity-wrapper">
                    Tickets
                    <div className="tile-quantity">
                        <h4>open</h4>
                        <p>4</p>
                    </div>
                    <div className="tile-quantity">
                        <h4>Gesloten</h4>
                        <p>6</p>
                    </div>
                    <div className="tile-quantity">
                        <h4>Minuten</h4>
                        <p>600</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home