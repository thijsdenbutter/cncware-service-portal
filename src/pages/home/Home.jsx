import NavBar from "../../components/navBar/NavBar.jsx";
import './Home.css'

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
                <h2>Company name</h2>
                <p>{dummyCompanies[0].name}</p>
                <h3>Costumer name</h3>
                <p>{dummyCompanies[0].contact.first_name + " " + dummyCompanies[0].contact.last_name}</p>
                <div className="tile-quanity-wrapper">
                    <div className="tile-quantity">
                        <h4>open</h4>
                        <p>4</p>
                    </div>
                    <div className="tile-quantity">
                        <h4>closed</h4>
                        <p>6</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home