import './ControlBar.css';
import {useContext} from "react";
import Divider from "../divider/Divider.jsx";
import Timer from "../timer/Timer.jsx";
import FilterCompanyName from "../filters/filter-company-name/FilterCompanyName.jsx";
import FilterStatus from "../filters/filter-status/FilterStatus.jsx";
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {TimerContext} from "../../context/TimerContext.jsx";
import useDeviceType from "../../hooks/useDeviceType.js";

function ControlBar() {

    const {
        user,
        isAuthenticated
    } = useContext(AuthContext);

    const {
        startTimer,
        pauseTimer,
        registerTime,
        error,
        success
    } = useContext(TimerContext);

    const device = useDeviceType();



    return (
        <div className="control-bar-outer-container">
            <div className="control-bar-section filters">
                {isAuthenticated &&
                    <>
                        {user?.role === "admin" &&
                            <FilterCompanyName/>}
                        <FilterStatus/>
                    </>
                }
            </div>
            <div className="control-bar-section right-side">
                <div className="control-bar-section timer">
                    {user?.role === "admin" &&
                        <>
                            <Divider direction="vertical"/>
                            <Button onClick={startTimer} styling="default">Start</Button>
                            <Button onClick={pauseTimer} styling="default">Pauzeer</Button>
                            <Button onClick={registerTime} styling="default">Registreer</Button>
                            <Timer/>
                            <Divider direction="vertical"/>
                            {error && <p>{error}</p>}
                            {success && <p>{success}</p>}
                        </>
                    }
                </div>
                {device === "desktop" &&
                    <div className="control-bar-section auth">
                        {isAuthenticated &&
                            <Button styling="default" to="/nieuwe-chat">Nieuwe chat</Button>}
                        <Button styling="default" to="/login">{!user ? "Inloggen" : "Uitloggen"}</Button>
                    </div>}
                {device !== "desktop"  && !user &&
                    <div className="control-bar-section auth">
                        <Button styling="default" to="/login">{!user ? "Inloggen" : "Uitloggen"}</Button>
                    </div>}
            </div>
        </div>
    );
}

export default ControlBar;