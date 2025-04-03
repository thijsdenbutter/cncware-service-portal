import './Button.css'

function Button({caption, onClick}) {
    return (
        <button
            className="button-default"
            onClick={onClick}
        >
            {caption}
        </button>
    )
}
export default Button