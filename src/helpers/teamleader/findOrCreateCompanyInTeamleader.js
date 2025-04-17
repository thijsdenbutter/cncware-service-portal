import {fetchCompanies} from "./fetchCompanies.js";
import {createNewCompany} from "./createNewCompany.js";

export async function findOrCreateCompanyInTeamleader(companyName, email, token) {
    try {
        const companies = await fetchCompanies(token, companyName);

        const match = companies.find(
            (c) => c.name?.toLowerCase() === companyName.toLowerCase()
        );

        if (match) {
            return match.id;
        }

        const createResponse = await createNewCompany(token, companyName, email);

        return createResponse.id;

    } catch (err) {
        console.error("❌ Fout bij koppelen met Teamleader:", err);
        throw err;
    }
}