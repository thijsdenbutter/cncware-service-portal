import './ControlBar.css'
import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Divider from "../divider/Divider.jsx";
import ButtonStart from "../button-start/ButtonStart.jsx";
import ButtonStop from "../button-stop/ButtonStop.jsx";
import Timer from "../timer/Timer.jsx";
import ButtonRegister from "../button-register/ButtonRegister.jsx";
import FilterCostumer from "../filter-costumer/FilterCostumer.jsx";
import FilterStatus from "../filter-status/FilterStatus.jsx";

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
                <FilterCostumer/>
                <FilterStatus/>
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/nieuwe-chat">Nieuwe chat</NavLink>
                <Divider direction="vertical"/>
                <Timer seconds={seconds}/>
                <ButtonRegister intervalRef={intervalRef} setIsRunning={setIsRunning} isRunning={isRunning} setSeconds={setSeconds}/>
                <ButtonStop setIsRunning={setIsRunning} intervalRef={intervalRef}/>
                <ButtonStart intervalRef={intervalRef} setIsRunning={setIsRunning} setSeconds={setSeconds}/>
                <Divider direction="vertical"/>
            </div>
        </div>
    )
}

export default ControlBar;