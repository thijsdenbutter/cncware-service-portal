import axios from "axios";

export async function fetchContactList(token, companyId) {
    const response = await axios.post("https://api.focus.teamleader.eu/contacts.list", {
        filter: {company_id: companyId}
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return response.data.data;
}