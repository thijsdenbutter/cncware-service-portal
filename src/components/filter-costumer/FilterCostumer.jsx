import Filter from "../Filter/Filter.jsx";
import {useContext} from "react";
import {FilterContext} from "../../context/FilterContext.jsx";

function FilterCostumer() {
    const {filterCostumer, setFilterCostumer} = useContext(FilterContext)

    return (
        <Filter
            placeholder="Filter op klant"
            value={filterCostumer}
            onChange={(e) => {
                setFilterCostumer(e.target.value)
            }}
        />
    )
}

export default FilterCostumer;