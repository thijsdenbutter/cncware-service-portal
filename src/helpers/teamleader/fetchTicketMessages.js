import axios from "axios";

export async function fetchTicketMessages({ticketId, token}){
    const response = await axios.post(
        "https://api.focus.teamleader.eu/tickets.listMessages",
        {
            id: ticketId,
            filter: {
                type: "customer",
            },
            page: {
                size: 50,
                number: 1
            }
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