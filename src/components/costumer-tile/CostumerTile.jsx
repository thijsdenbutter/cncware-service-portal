import './CostumerTile.css';
import InfoRow from "../info-row/InfoRow.jsx";
import Divider from "../divider/Divider.jsx";
import StatBlock from "../stats/stat-block/StatBlock.jsx";
import Stat from "../stats/stat/Stat.jsx";
import ticketsCount from "../../helpers/ticketCount.js";
import {useContext} from "react";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";

function CostumerTile({name, contact, supportMinutes, tickets}) {
    const {
        ticketStatuses
    } = useContext(TeamleaderContext);

    return (
        <div className="costumer-tile">

            <InfoRow label="Bedrijfsnaam" value={name}/>
            <InfoRow label="Contact"
                     value={contact ? contact.first_name + " " + contact.last_name : "geen contact"}/>
            <Divider direction="horizontal"/>
            <StatBlock title="Tickets">
                <Stat label="Open" value={ticketsCount(tickets, ticketStatuses, "open")}/>
                <Stat label="Gesloten" value={ticketsCount(tickets, ticketStatuses, "closed")}/>
                <Stat label="Minuten" value={supportMinutes}/>
            </StatBlock>
        </div>
    );
}

export default CostumerTile;