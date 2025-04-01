import './CostumerTile.css'
import InfoRow from "../info-row/InfoRow.jsx";
import Divider from "../divider/Divider.jsx";
import StatBlock from "../stat-block/StatBlock.jsx";
import Stat from "../stat/Stat.jsx";
import TicketsCount from "../../helpers/TicketCount.js";
import SupportMinutesLeft from "../../helpers/SupportMinutesLeft.js";

function CostumerTile({company}) {
    const { name, contact, tickets, custom_fields } = company.data;

    return (
        <div className="costumer-tile">
            <InfoRow label="Bedrijfsnaam" value={name}/>
            <InfoRow label="Contact"
                     value={contact.first_name + " " + contact.last_name}/>
            <Divider direction="horizontal"/>
            <StatBlock title="Tickets">
                <Stat label="Open" value={TicketsCount(tickets, "open")}/>
                <Stat label="Gesloten" value={TicketsCount(tickets, "gesloten")}/>
                <Stat label="Minuten" value={SupportMinutesLeft(custom_fields)}/>
            </StatBlock>
        </div>
    )
}

export default CostumerTile