import './InputTextArea.css';

function InputTextArea({ value, onChange, placeholder, ...rest }) {
    return (
        <textarea
            className="input-textarea"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
        />
    );
}

export default InputTextArea;