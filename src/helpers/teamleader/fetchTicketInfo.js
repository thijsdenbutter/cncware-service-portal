import axios from "axios";

export async function fetchTicketInfo({ ticketId, token }) {
    const response = await axios.post(
        "https://api.focus.teamleader.eu/tickets.info",
        { id: ticketId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data.data;
}