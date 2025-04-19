import {useContext} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";
import InputSelect from "../../inputs/input-select/InputSelect.jsx";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";

function FilterStatus() {
    const {
        filterStatus,
        setFilterStatus
    } = useContext(FilterContext);
    const {
        ticketStatuses
    } = useContext(TeamleaderContext);

    const options = ticketStatuses ? ticketStatuses.map((ticketStatus) => ({
        label: ticketStatus.name,
        value: ticketStatus.id
    })) : "";

    return (
        <InputSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={options}
            placeholder="Filter op status"
        />
    );
}

export default FilterStatus;