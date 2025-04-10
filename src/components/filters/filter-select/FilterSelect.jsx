import './FilterSelect.css'

function FilterSelect({ value, onChange, options, placeholder }) {
    return (
        <select
            className={`filter-input ${value === "" ? "placeholder-active" : ""}`}
            value={value}
            onChange={onChange}>
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {typeof option.label === "string"
                        ? option.label.charAt(0).toUpperCase() + option.label.slice(1)
                        : option.label}
                </option>
            ))}
        </select>
    );
}

export default FilterSelect;