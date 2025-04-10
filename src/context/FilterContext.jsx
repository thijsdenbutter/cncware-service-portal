import {createContext, useState} from "react";

export const FilterContext = createContext({})

export function  FilterProvider({children}) {
    const [filterCompanyName, setFilterCompanyName] = useState("")
    const [filterStatus, setFilterStatus] = useState("")

    const filterData = (data, getCompanyName, getStatus) => {
        return data.filter((item) => {
            const companyName = getCompanyName ? getCompanyName(item) : "";
            const status = getStatus ? getStatus(item) : "";

            const matchCompanyName = companyName
                .toLowerCase()
                .includes(filterCompanyName.toLowerCase());

            const matchStatus =
                filterStatus === "" || status === filterStatus;

            return matchCompanyName && matchStatus;
        })
    }

    return (
        <FilterContext.Provider value={{
            filterData,
            filterCompanyName,
            setFilterCompanyName,
            filterStatus,
            setFilterStatus,
        }}>
            {children}
        </FilterContext.Provider>
    )
}