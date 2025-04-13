import './Input.css';
import { forwardRef } from "react";

const Input = forwardRef(({ type = "text", placeholder, ...rest }, ref) => {
    return (
        <input
            className="input-default"
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
        />
    );
});

export default Input;
