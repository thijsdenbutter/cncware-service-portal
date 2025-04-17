import axios from "axios";

export async function fetchCustomFields(token, contextFilter) {
    const response = await axios.post(
        "https://api.focus.teamleader.eu/customFieldDefinitions.list",
        {
            filter: {context: contextFilter}
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return (response.data.data);
}