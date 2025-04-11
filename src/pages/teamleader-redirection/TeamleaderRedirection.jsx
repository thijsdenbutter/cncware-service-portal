import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";

const TeamleaderRedirect = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        fetchCompanyCustomFields,
        fetchTicketStatuses,
        error
    } = useContext(TeamleaderContext)

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const refreshToken = params.get("refresh");
        const expiresAt = params.get("expires_at");

        if (token) {
            localStorage.setItem("teamleader_token", token);
            localStorage.setItem("teamleader_refresh_token", refreshToken);
            localStorage.setItem("teamleader_token_expires_at", expiresAt);

            fetchTicketStatuses(token)
            fetchCompanyCustomFields(token)
        } else {
            console.warn("⚠️ Token, refresh of expires_at ontbreekt in de redirect.");
        }

    }, []);

    useEffect(() => {
        if (!isLoading && !error) {
            navigate("/");
        }
    }, [isLoading, error])

    return (error ? <p>{error}</p> :
            <p>Verwerken van Teamleader authenticatie...</p>
    )
};

export default TeamleaderRedirect;
