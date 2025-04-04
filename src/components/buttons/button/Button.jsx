import './Button.css'

function Button({children, onClick}) {
    return (
        <button
            className="button-default"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button