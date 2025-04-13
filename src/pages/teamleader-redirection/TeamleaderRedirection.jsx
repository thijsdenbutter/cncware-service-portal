import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const TeamleaderRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const refreshToken = params.get("refresh");
        const expiresAt = params.get("expires_at");

        if (token) {
            localStorage.setItem("teamleader_token", token);
            localStorage.setItem("teamleader_refresh_token", refreshToken);
            localStorage.setItem("teamleader_token_expires_at", expiresAt);

            navigate("/login");
        } else {
            console.warn("⚠️ Token, refresh of expires_at ontbreekt in de redirect.");
        }
    }, []);

    return <p>Verwerken van Teamleader authenticatie...</p>;
};

export default TeamleaderRedirect;
