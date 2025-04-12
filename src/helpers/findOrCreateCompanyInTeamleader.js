import axios from "axios";

export async function findOrCreateCompanyInTeamleader(companyName, email, token) {
    try {
        const response = await axios.post(
            "https://api.focus.teamleader.eu/companies.list",
            {
                filter: {
                    term: companyName,
                },
                page: {
                    size: 50,
                    number: 1,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const companies = response.data.data;

        const match = companies.find(
            (c) => c.name?.toLowerCase() === companyName.toLowerCase()
        );

        if (match) {
            return match.id; // ✅ Bestaat al → gebruiken
        }


        const createResponse = await axios.post(
            "https://api.focus.teamleader.eu/companies.add",
            {
                name: companyName,
                emails: [
                    {
                        type: "primary",
                        email,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return createResponse.data.data.id;

    } catch (err) {
        console.error("❌ Fout bij koppelen met Teamleader:", err);
        throw err;
    }
}