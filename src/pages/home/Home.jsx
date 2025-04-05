import './Home.css'
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const token = localStorage.getItem("teamleader_token");

            if (!token) {
                console.error("⚠️ Geen toegangstoken gevonden.");
                return;
            }

            try {
                const response = await axios.post(
                    "https://api.focus.teamleader.eu/companies.list",
                    {}, // lege body is prima
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const companyData = response.data.data;
                console.log("📦 Bedrijven:", companyData);
                setCompanies(companyData);
            } catch (error) {
                console.error("❌ Fout bij ophalen bedrijven:", error);
                if (error.response?.status === 401) {
                    console.warn("🔑 Token is verlopen of ongeldig.");
                    // eventueel redirect naar login of token verwijderen
                }
            }
        };

        fetchCompanies();
    }, []);
    const dummyCompanies = [
        {
            data: {
                id: "company-001",
                name: "Bouwbedrijf De Hamer",
                contact: {
                    id: "contact-001",
                    first_name: "Jan",
                    last_name: "Jansen",
                    email: "jan@dehamer.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 750
                    }
                ],
                tickets: [
                    { id: "ticket-123", subject: "Installatie probleem", status: "open" },
                    { id: "ticket-124", subject: "Factuurvraag", status: "gesloten" }
                ]
            }
        },
        {
            data: {
                id: "company-002",
                name: "Interieurmakers BV",
                contact: {
                    id: "contact-002",
                    first_name: "Lisa",
                    last_name: "de Vries",
                    email: "lisa@interieurmakers.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 300
                    }
                ],
                tickets: [
                    { id: "ticket-125", subject: "Licentie probleem", status: "open" }
                ]
            }
        },
        {
            data: {
                id: "company-003",
                name: "Meubelmakers & Co",
                contact: {
                    id: "contact-003",
                    first_name: "Peter",
                    last_name: "Klaassen",
                    email: "p.klaassen@meubelco.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 0
                    }
                ],
                tickets: [
                    { id: "ticket-126", subject: "Vraag over instellingen", status: "gesloten" },
                    { id: "ticket-127", subject: "Gebruikersrechten", status: "gesloten" }
                ]
            }
        },
        {
            data: {
                id: "company-004",
                name: "Houtbewerkers Zuid",
                contact: {
                    id: "contact-004",
                    first_name: "Sanne",
                    last_name: "Bakker",
                    email: "s.bakker@houtzuid.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 1200
                    }
                ],
                tickets: [
                    { id: "ticket-128", subject: "Foutmelding bij opstarten", status: "open" },
                    { id: "ticket-129", subject: "Update mislukt", status: "open" },
                    { id: "ticket-130", subject: "Export probleem", status: "gesloten" }
                ]
            }
        },
        {
            data: {
                id: "company-005",
                name: "Timmerbedrijf Noord",
                contact: {
                    id: "contact-005",
                    first_name: "Kevin",
                    last_name: "van Dijk",
                    email: "kevin@timmernoord.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 200
                    }
                ],
                tickets: [
                    { id: "ticket-131", subject: "Tijdregistratie werkt niet", status: "gesloten" }
                ]
            }
        },
        {
            data: {
                id: "company-006",
                name: "CNC Profs",
                contact: {
                    id: "contact-006",
                    first_name: "Anouk",
                    last_name: "Veenstra",
                    email: "anouk@cncprofs.nl"
                },
                custom_fields: [
                    {
                        id: "custom_field_support_minutes",
                        value: 980
                    }
                ],
                tickets: [
                    { id: "ticket-132", subject: "Vraag over abonnement", status: "open" },
                    { id: "ticket-133", subject: "Factuur onduidelijk", status: "open" },
                    { id: "ticket-134", subject: "Handleiding ontbreekt", status: "open" },
                    { id: "ticket-135", subject: "Bestanden kwijt", status: "gesloten" }
                ]
            }
        }
    ];



    return (
        <div className="home-layout">
            {companies.map((company) => {
                   return(
                       <CostumerTile key={company.id} company={company}/>
                   )
            })}
        </div>
    )
}

export default Home