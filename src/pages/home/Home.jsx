import './Home.css'
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import valueOfCustomField from "../../helpers/valueOfCustomField.js";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";

function Home() {
    const [companies, setCompanies] = useState([]);

    const { customFieldsCompanies } = useContext(TeamleaderContext)

    useEffect(() => {

        const fetchCompanies = async () => {
            const token = localStorage.getItem("teamleader_token");

            if (!token) {
                console.error("⚠️ Geen toegangstoken gevonden.");
                return;
            }

            try {
                const listResponse = await axios.post(
                    "https://api.focus.teamleader.eu/companies.list",
                    {
                        page: {
                            size: 50,
                            number: 1
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const baseCompanies = listResponse.data.data;

                const enrichedCompanies = await Promise.all(baseCompanies.map(async (company) => {
                    const companyId = company.id;

                    const [infoResponse, contactResponse, ticketsResponse] = await Promise.all([
                        axios.post(
                            "https://api.focus.teamleader.eu/companies.info",
                            {id: companyId},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        ),
                        axios.post(
                            "https://api.focus.teamleader.eu/contacts.list",
                            {filter: {company_id: companyId}},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        ),
                        axios.post(
                            "https://api.focus.teamleader.eu/tickets.list",
                            {
                                filter: {
                                    relates_to: {
                                        type: "company",
                                        id: companyId
                                    }
                                }
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json"
                                }
                            }
                        )
                    ]);
                    const fullCompany = infoResponse.data.data;
                    const contact = contactResponse.data.data;
                    const tickets = ticketsResponse.data.data

                    const supportMinutes = valueOfCustomField(fullCompany.custom_fields, customFieldsCompanies,"Support minuten");

                    return {
                        id: companyId,
                        name: fullCompany.name,
                        contact: contact[0],
                        supportMinutes: supportMinutes,
                        tickets: tickets,
                    };
                }));

                setCompanies(enrichedCompanies);

            } catch (error) {
                console.error("❌ Fout bij ophalen bedrijven:", error);
                if (error.response?.status === 401) {
                    console.warn("🔑 Token is verlopen of ongeldig.");
                    // eventueel redirect naar login of token verwijderen
                }
            }
        };

        fetchCompanies()
    }, []);

    useEffect(() => console.log(companies), [companies]);


    return (
        <div className="home-layout">
            {companies.map((company) => {
                return (
                    <CostumerTile
                        key={company.id}
                        name={company.name}
                        contact={company.contact}
                        supportMinutes={company.supportMinutes}
                        tickets={company.tickets}
                    />
                )
            })}
        </div>
    )
}

export default Home