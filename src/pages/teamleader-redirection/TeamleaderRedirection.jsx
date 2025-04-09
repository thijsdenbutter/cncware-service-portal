import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";

const TeamleaderRedirect = () => {
    const navigate = useNavigate();

    const {
        teamleaderDataIsLoaded,
        setTeamleaderDataIsLoaded,
        fetchCompanyCustomFields,
        fetchTicketStatuses,
        error
    } = useContext(TeamleaderContext)

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("teamleader_token", token);

            if (!teamleaderDataIsLoaded) {
                fetchTicketStatuses(token)
                fetchCompanyCustomFields(token)
                setTeamleaderDataIsLoaded(true)
            }
        }


    }, []);

    useEffect(() => {
        if (teamleaderDataIsLoaded && !error) {
            navigate("/");
        }
    }, [teamleaderDataIsLoaded, error])

    return (error ? <p>{error}</p> :
            <p>Verwerken van Teamleader authenticatie...</p>
    )
};

export default TeamleaderRedirect;
