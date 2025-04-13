import './Input.css';
import { forwardRef } from "react";

const Input = forwardRef(({ type = "text", className = "", placeholder, ...rest }, ref) => {
    return (
        <input
            className={`input-default ${className}`}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
        />
    );
});

export default Input;
