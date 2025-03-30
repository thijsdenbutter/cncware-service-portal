import {createContext, useState} from "react";

export const FilterContext = createContext({})

export function  FilterProvider({children}) {
    const [filterCostumer, setFilterCostumer] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    return (
        <FilterContext.Provider value={{
            filterCostumer,
            setFilterCostumer,
            filterStatus,
            setFilterStatus,
        }}>
            {children}
        </FilterContext.Provider>
    )
}