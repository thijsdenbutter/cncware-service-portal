import './CostumerTile.css'
import InfoRow from "../info-row/InfoRow.jsx";
import Divider from "../divider/Divider.jsx";
import StatBlock from "../stat-block/StatBlock.jsx";
import Stat from "../stat/Stat.jsx";

function CostumerTile({company}) {
    return (
        <div className="costumer-tile">
            <InfoRow label="Bedrijfsnaam" value={company.name}/>
            <InfoRow label="Contact"
                     value={company.contact.first_name + " " + company.contact.last_name}/>
            <Divider direction="horizontal"/>
            <StatBlock title="Tickets">
                <Stat label="Open" value="4"/>
                <Stat label="Gesloten" value="6"/>
                <Stat label="Minuten" value="600"/>
            </StatBlock>
        </div>
    )
}

export default CostumerTile