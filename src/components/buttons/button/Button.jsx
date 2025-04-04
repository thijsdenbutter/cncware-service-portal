import './Button.css'

function Button({children, styling, onClick}) {
    return (
        <button
            className={`button-${styling}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button