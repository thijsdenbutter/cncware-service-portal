import axios from "axios";

export async function fetchTicketStatuses(token) {
    const statusesResponse = await axios.post(
        "https://api.focus.teamleader.eu/ticketStatus.list",
        {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    const listOfStatuses = statusesResponse.data.data;

    return listOfStatuses.map(status => ({
        id: status.id,
        name: status.status === "custom" ? status.label : status.status,
    }));
}