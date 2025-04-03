import {useContext} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";
import FilterSelect from "../filter-select/FilterSelect.jsx";

function FilterStatus() {
    const {filterStatus, setFilterStatus} = useContext(FilterContext)

    return (
        <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={["open", "gesloten"]}
            placeholder="Filter op status"
        />
    )
}

export default FilterStatus;