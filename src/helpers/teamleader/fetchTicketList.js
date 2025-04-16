import axios from "axios";

export async function fetchTicketList(token, companyId) {
    const payload = {};

    if (companyId) {
        payload.filter = {
            relates_to: {
                type: "company",
                id: companyId
            }
        };
    }

    const response = await axios.post(
        "https://api.focus.teamleader.eu/tickets.list",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    console.log(response.data.data);
    return response.data.data;
}