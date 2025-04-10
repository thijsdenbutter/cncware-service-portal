import './Home.css'
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import valueOfCustomField from "../../helpers/valueOfCustomField.js";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";
import {FilterContext} from "../../context/FilterContext.jsx";

function Home() {
    const [companies, setCompanies] = useState([]);
    const [companyError, setCompanyError] = useState(null);
    const {
        customFieldsCompanies,
        isLoading,
        error: contextError,
    } = useContext(TeamleaderContext)
    const {
        filterData,
        filterCompanyName,
        filterStatus
    } = useContext(FilterContext)

    async function fetchBaseCompanies(token) {
        const response = await axios.post(
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

        return response.data.data;
    }

    async function enrichCompanyData(company, token) {
        const companyId = company.id;

        try {
            const [infoRes, contactRes, ticketsRes] = await Promise.all([
                axios.post("https://api.focus.teamleader.eu/companies.info", {id: companyId}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }),
                axios.post("https://api.focus.teamleader.eu/contacts.list", {
                    filter: {company_id: companyId}
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }),
                axios.post("https://api.focus.teamleader.eu/tickets.list", {
                    filter: {
                        relates_to: {
                            type: "company",
                            id: companyId
                        }
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
            ]);

            const fullCompany = infoRes.data.data;
            const contact = contactRes.data.data || null;
            const tickets = ticketsRes.data.data;

            const supportMinutes = valueOfCustomField(
                fullCompany.custom_fields,
                customFieldsCompanies,
                "Support minuten"
            );

            return {
                id: companyId,
                name: fullCompany.name,
                contact: contact[0],
                supportMinutes,
                tickets
            };
        } catch (error) {
            console.error(`⚠️ Mislukt voor bedrijf ${companyId}:`, error);
            return null;
        }
    }

    async function fetchAndBuildCompanies() {
        const token = localStorage.getItem("teamleader_token");

        if (!token) {
            setCompanyError("Geen toegangstoken gevonden.");
            return;
        }

        try {
            const baseCompanies = await fetchBaseCompanies(token);
            const enriched = await Promise.all(
                baseCompanies.map(c => enrichCompanyData(c, token))
            );

            const filtered = enriched.filter(c => c !== null);
            setCompanies(filtered);
        } catch (err) {
            console.error("❌ Fout bij ophalen bedrijven:", err);
            setCompanyError("Fout bij ophalen bedrijven.");
        }
    }

    useEffect(() => {
        if (customFieldsCompanies.length > 0) {
            fetchAndBuildCompanies();
        }
    }, [customFieldsCompanies]);

    useEffect(() => console.log(companies), [companies]);

    if (isLoading) {
        return <p>Gegevens worden geladen...</p>;
    }

    if (contextError || companyError) {
        return <p>{contextError || companyError}</p>;
    }

    const filteredCompanies = filterData(
        companies,
        (company) => company.name,
        (company) => company.tickets.map((t) => t.status.id)
    );

    return (

        <div className="home-layout">
            {filteredCompanies.map((company) => {
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