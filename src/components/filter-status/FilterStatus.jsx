import Filter from "../Filter/Filter.jsx";
import {useContext} from "react";
import {FilterContext} from "../../context/FilterContext.jsx";

function FilterStatus() {
    const {filterStatus, setFilterStatus} = useContext(FilterContext)

    return (
        <Filter
            placeholder="Filter op status"
            value={filterStatus}
            onChange={(e) => {
                setFilterStatus(e.target.value)
            }}
        />
    )
}

export default FilterStatus;