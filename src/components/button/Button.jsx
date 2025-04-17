import './Button.css';
import { NavLink } from 'react-router-dom';

function Button({ children, styling = "default", variant = "", onClick, to, type = "button" }) {
    const baseClass = `button-${styling}`;
    const variantClass = variant ? `button-variant-${variant}` : "";
    const combinedClass = `${baseClass} ${variantClass}`.trim();


    if (to) {
        return (
            <NavLink to={to} className={combinedClass}>
                {children}
            </NavLink>
        );
    }

    return (
        <button className={combinedClass} onClick={onClick} type={type}>
            {children}
        </button>
    );
}

export default Button;
