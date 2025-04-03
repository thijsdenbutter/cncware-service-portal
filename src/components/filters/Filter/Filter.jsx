import './Filter.css';

function Filter({ value, onChange, placeholder }) {
    return (
        <input
            className="filter-input"
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default Filter;
