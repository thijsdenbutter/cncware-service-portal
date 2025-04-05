import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamleaderRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("teamleader_token", token);
            console.log("✅ Token opgeslagen:", token);
        }

        navigate("/");
    }, []);

    return <p>Verwerken van Teamleader authenticatie...</p>;
};

export default TeamleaderRedirect;
