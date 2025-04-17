import './Companies.css';
import CostumerTile from "../../components/costumer-tile/CostumerTile.jsx";
import {useContext, useEffect, useState} from "react";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";
import {FilterContext} from "../../context/FilterContext.jsx";
import {fetchCompanies} from "../../helpers/teamleader/fetchCompanies.js";
import {fetchCompanyInfo} from "../../helpers/teamleader/fetchCompanyInfo.js";
import {fetchContactList} from "../../helpers/teamleader/fetchContactList.js";
import {fetchTickets} from "../../helpers/teamleader/fetchTickets.js";
import {getSupportMinutesForCompanyData} from "../../helpers/getSupportMinutesForCompanyData.js";

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [companyError, setCompanyError] = useState(null);
    const {
        customFieldsCompanies,
        fetchCompanyCustomFields,
        fetchTicketStatuses,
        isLoading,
        error: contextError,
        getValidTeamleaderAccessToken
    } = useContext(TeamleaderContext);
    const {
        filterData,
    } = useContext(FilterContext);

    async function enrichCompanyData(company, token) {
        const companyId = company.id;

        try {
            const [infoRes, contactRes, ticketsRes] = await Promise.all([
                fetchCompanyInfo(token, companyId),
                fetchContactList(token, companyId),
                fetchTickets(token, companyId)
            ]);

            const fullCompany = infoRes;
            const contact = contactRes || null;
            const tickets = ticketsRes;

            const supportMinutes = getSupportMinutesForCompanyData(fullCompany, customFieldsCompanies);

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
        const token = await getValidTeamleaderAccessToken();

        if (!token) {
            setCompanyError("Geen toegangstoken gevonden.");
            return;
        }

        try {
            const baseCompanies = await fetchCompanies(token);
            const enriched = await Promise.all(
                baseCompanies.map(c => enrichCompanyData(c, token))
            );

            const filtered = enriched.filter(c => c !== null);
            setCompanies(filtered);
        } catch (err) {
            console.error("❌ Fout bij ophalen bedrijven:", err);
            setCompanyError("❌ Fout bij ophalen bedrijven.");
        }
    }

    useEffect(() => {
        fetchTicketStatuses();
        fetchCompanyCustomFields();
    }, []);

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
                );
            })}
        </div>
    );
}

export default Companies;