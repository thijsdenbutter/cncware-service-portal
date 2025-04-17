import axios from "axios";

export async function updateSupportMinutesForCompany({token, companyId, customFieldId, newValue}) {
    const response = await axios.post(
        "https://api.focus.teamleader.eu/companies.update",
        {
            id: companyId,
            custom_fields: [
                {
                    id: customFieldId,
                    value: newValue
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

    return response.data;
}