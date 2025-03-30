import './ControlBar.css'
import {NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useEffect, useRef, useState} from "react";

function ControlBar() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (intervalRef.current !== null) return; // er loopt al een timer

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        setIsRunning(true);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        console.log(seconds);
    }, [seconds]);

    const formatTime = () => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/new-chat">New chat</NavLink>
                <span className="divider-vertical"/>
                <span className="timer-display">{formatTime()}</span>
                <Button caption="Register"/>
                <Button caption="Stop" onClick={stopTimer}/>
                <Button caption="Start" onClick={startTimer}/>
                <span className="divider-vertical"/>
            </div>
        </div>
    )
}

export default ControlBar;