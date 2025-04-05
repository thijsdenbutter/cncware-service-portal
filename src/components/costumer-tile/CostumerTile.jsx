import './CostumerTile.css'
import InfoRow from "../info-row/InfoRow.jsx";
import Divider from "../divider/Divider.jsx";
import StatBlock from "../stats/stat-block/StatBlock.jsx";
import Stat from "../stats/stat/Stat.jsx";
import ticketsCount from "../../helpers/ticketCount.js";
import supportMinutesLeft from "../../helpers/supportMinutesLeft.js";

function CostumerTile({company}) {
    console.log(company.name);
    const { name} = company;
    // const { name, contact, tickets, custom_fields } = company;

    return (
        <div className="costumer-tile">

            <InfoRow label="Bedrijfsnaam" value={name}/>
            {/*<InfoRow label="Contact"*/}
            {/*         value={contact.first_name + " " + contact.last_name}/>*/}
            {/*<Divider direction="horizontal"/>*/}
            {/*<StatBlock title="Tickets">*/}
            {/*    <Stat label="Open" value={ticketsCount(tickets, "open")}/>*/}
            {/*    <Stat label="Gesloten" value={ticketsCount(tickets, "gesloten")}/>*/}
            {/*    <Stat label="Minuten" value={supportMinutesLeft(custom_fields)}/>*/}
            {/*</StatBlock>*/}
        </div>
    )
}

export default CostumerTile