import axios from "axios";

export async function fetchCurrentUser(token) {

    const response = await axios.post(
        "https://api.focus.teamleader.eu/users.me",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data.data;
}