import axios from "axios";

export async function registerTimeTracking({userId, ticketId, startedAt, duration, token}) {
    if (!token || !userId) throw new Error("Geen geldig token of userId");

    const response = await axios.post(
        "https://api.focus.teamleader.eu/timeTracking.add",
        {
            subject: {
                type: "ticket",
                id: ticketId,
            },
            user_id: userId,
            started_at: startedAt,
            duration,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data.data;
}