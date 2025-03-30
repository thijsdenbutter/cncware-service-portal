import './ControlBar.css'
import {NavLink} from "react-router-dom";

function ControlBar() {
    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
                <button>button1</button>
                <button>button2</button>
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/new-chat">New chat</NavLink>
                <button>Stop</button>
            </div>
        </div>
    )
}

export default ControlBar;