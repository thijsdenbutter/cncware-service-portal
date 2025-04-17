import axios from "axios";

export async function createNewTicket({subject, customerId, ticketStatusId, description, accessToken}) {
    const response = await axios.post(
        'https://api.focus.teamleader.eu/tickets.create',
        {
            subject,
            customer: {
                type: 'company',
                id: customerId,
            },
            ticket_status_id: ticketStatusId,
            description,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data.data;
}