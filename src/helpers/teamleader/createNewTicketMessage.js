import axios from "axios";
import formatDateTimeWithOffset from "../formatDateTimeWithOffset.js";

export async function createNewTicketMessage({ token, ticketId, message, senderId }) {
    const response = await axios.post(
        "https://api.focus.teamleader.eu/tickets.importMessage",
        {
            id: ticketId,
            body: message,
            sent_by: {
                type: "company",
                id: senderId
            },
            sent_at: formatDateTimeWithOffset()
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data.data;
}