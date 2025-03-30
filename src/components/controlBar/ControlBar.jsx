import './ControlBar.css'
import {NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import Divider from "../divider/Divider.jsx";
import StartButton from "../start-button/StartButton.jsx";
import StopButton from "../stop-button/StopButton.jsx";
import Timer from "../timer/Timer.jsx";

function ControlBar() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const interval = intervalRef.current;
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/new-chat">New chat</NavLink>
                <Divider direction="vertical"/>
                <Timer seconds={seconds}/>
                <Button caption="Register"/>
                <StopButton setIsRunning={setIsRunning} intervalRef={intervalRef}/>
                <StartButton intervalRef={intervalRef} setIsRunning={setIsRunning} setSeconds={setSeconds}/>
                <Divider direction="vertical"/>
            </div>
        </div>
    )
}

export default ControlBar;