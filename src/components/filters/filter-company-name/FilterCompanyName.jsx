import Input from "../../input/Input.jsx";
import {useContext} from "react";
import {FilterContext} from "../../../context/FilterContext.jsx";

function FilterCompanyName() {
    const {filterCompanyName, setFilterCompanyName} = useContext(FilterContext)

    return (
        <Input
            placeholder="Input op bedrijfsnaam"
            value={filterCompanyName}
            onChange={(e) => {
                setFilterCompanyName(e.target.value)
            }}
        />
    )
}

export default FilterCompanyName;