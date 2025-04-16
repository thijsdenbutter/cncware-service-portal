import axios from "axios";

export async function fetchCompanies(token, term) {
    let payload = {
        page: {
            size: 50,
            number: 1
        }
    };

    if (term) {
        payload.filter = {
            term: term,
        };
    }
    const response = await axios.post(
        "https://api.focus.teamleader.eu/companies.list",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data.data;
}