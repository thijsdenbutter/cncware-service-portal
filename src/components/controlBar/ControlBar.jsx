import './ControlBar.css'
import {NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";

function ControlBar() {
    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
                <button>button1</button>
                <button>button2</button>
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/new-chat">New chat</NavLink>
                <Button/>
            </div>
        </div>
    )
}

export default ControlBar;