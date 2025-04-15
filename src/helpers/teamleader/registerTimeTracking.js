import axios from "axios";

export async function registerTimeTracking({userId, ticketId, duration, token}) {
    if (!token || !userId) throw new Error("Geen geldig token of userId");

    const res = await axios.post(
        "https://api.focus.teamleader.eu/timeTracking.create",
        {
            user_id: userId,
            ticket_id: ticketId,
            duration,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data.data;
}