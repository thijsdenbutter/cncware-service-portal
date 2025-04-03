import './FilterSelect.css'

function FilterSelect({ value, onChange, options, placeholder }) {
    return (
        <select className="filter-input" value={value} onChange={onChange}>
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
        </select>
    );
}

export default FilterSelect;