import Filter from "../filter/Filter.jsx";
import {useContext} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";

function FilterCompanyName() {
    const {filterCompanyName, setFilterCompanyName} = useContext(FilterContext)

    return (
        <Filter
            placeholder="Filter op bedrijfsnaam"
            value={filterCompanyName}
            onChange={(e) => {
                setFilterCompanyName(e.target.value)
            }}
        />
    )
}

export default FilterCompanyName;