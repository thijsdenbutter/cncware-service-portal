import axios from "axios";

export async function createNewCompany(token, companyName, email) {
    const response = await axios.post(
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

    return response.data.data;
}