import axios from "axios";

export async function fetchContactInfo(token, contactId) {
    const response = await axios.post(
        "https://api.focus.teamleader.eu/contacts.info",
        {id: contactId},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data.data;
}