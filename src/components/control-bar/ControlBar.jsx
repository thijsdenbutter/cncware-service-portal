import './ControlBar.css'
import {NavLink} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import Divider from "../divider/Divider.jsx";
import ButtonStart from "../buttons/button-start/ButtonStart.jsx";
import ButtonStop from "../buttons/button-stop/ButtonStop.jsx";
import Timer from "../timer/Timer.jsx";
import ButtonRegister from "../buttons/button-register/ButtonRegister.jsx";
import FilterCompanyName from "../filters/filter-company-name/FilterCompanyName.jsx";
import FilterStatus from "../filters/filter-status/FilterStatus.jsx";
import Button from "../buttons/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function ControlBar() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const {user, isAuthenticated} = useContext(AuthContext)

    useEffect(() => {
        const interval = intervalRef.current;
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-inner-container">
                {isAuthenticated &&
                    <>
                    {user?.role === "admin" &&
                        <FilterCompanyName/>}
                        <FilterStatus/>
                    </>
                }
            </div>
            <div className="control-bar-inner-container">
                <NavLink to="/login">{!user ? "Inloggen" : "Uitloggen"}</NavLink>
                {isAuthenticated &&
                <NavLink to="/nieuwe-chat">Nieuwe chat</NavLink>}
                {user?.role === "admin" &&
                    <>
                        <Divider direction="vertical"/>
                        <Timer seconds={seconds}/>
                        <ButtonRegister intervalRef={intervalRef} setIsRunning={setIsRunning} isRunning={isRunning}
                                        setSeconds={setSeconds}/>
                        <ButtonStop setIsRunning={setIsRunning} intervalRef={intervalRef}/>
                        <ButtonStart intervalRef={intervalRef} setIsRunning={setIsRunning} setSeconds={setSeconds}/>
                        <Divider direction="vertical"/>
                    </>
                }
            </div>
        </div>
    )
}

export default ControlBar;