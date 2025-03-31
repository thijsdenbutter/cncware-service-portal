import './CostumerTile.css'
import InfoRow from "../info-row/InfoRow.jsx";
import Divider from "../divider/Divider.jsx";
import StatBlock from "../stat-block/StatBlock.jsx";
import Stat from "../stat/Stat.jsx";

function CostumerTile({dummyCompanies}) {
    return (
        <div className="costumer-tile">
            <InfoRow label="Bedrijfsnaam" value={dummyCompanies[0].name}/>
            <InfoRow label="Contact"
                     value={dummyCompanies[0].contact.first_name + " " + dummyCompanies[0].contact.last_name}/>
            <Divider direction="horizontal"/>
            <StatBlock title="Tickets">
                <Stat label="Open" value="4"/>
                <Stat label="Geslote" value="6"/>
                <Stat label="Minuten" value="600"/>
            </StatBlock>
        </div>
    )
}

export default CostumerTile