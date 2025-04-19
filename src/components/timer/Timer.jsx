import './Timer.css';
import {useContext} from "react";
import {TimerContext} from "../../context/TimerContext.jsx";

function Timer() {

    const {
        seconds
    } = useContext(TimerContext);

    const formatTime = () => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <span className="timer-display">{formatTime()}</span>
    );
}

export default Timer;