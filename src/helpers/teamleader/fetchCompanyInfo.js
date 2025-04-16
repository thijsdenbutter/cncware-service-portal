import axios from "axios";

export async function fetchCompanyInfo(token, companyId) {
    const response = await axios.post("https://api.focus.teamleader.eu/companies.info", {
        id: companyId
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response.data.data;
}