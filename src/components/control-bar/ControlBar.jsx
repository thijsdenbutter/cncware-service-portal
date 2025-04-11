import './ControlBar.css'
import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Divider from "../divider/Divider.jsx";
import ButtonStart from "../buttons/button-start/ButtonStart.jsx";
import ButtonStop from "../buttons/button-stop/ButtonStop.jsx";
import Timer from "../timer/Timer.jsx";
import ButtonRegister from "../buttons/button-register/ButtonRegister.jsx";
import FilterCompanyName from "../filters/filter-company-name/FilterCompanyName.jsx";
import FilterStatus from "../filters/filter-status/FilterStatus.jsx";
import Button from "../buttons/button/Button.jsx";

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

const ConnectToTeamleader = () => {
    window.location.href = "http://localhost:3001/login";
    }




    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
                <FilterCompanyName/>
                <FilterStatus/>
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/nieuwe-chat">Nieuwe chat</NavLink>
                <Divider direction="vertical"/>
                <Timer seconds={seconds}/>
                <ButtonRegister intervalRef={intervalRef} setIsRunning={setIsRunning} isRunning={isRunning} setSeconds={setSeconds}/>
                <ButtonStop setIsRunning={setIsRunning} intervalRef={intervalRef}/>
                <ButtonStart intervalRef={intervalRef} setIsRunning={setIsRunning} setSeconds={setSeconds}/>
                <Divider direction="vertical"/>
                <Button onClick={() => {ConnectToTeamleader()}} styling="default">
                    Verbind met teamleader
                </Button>
            </div>
        </div>
    )
}

export default ControlBar;