import './ControlBar.css';
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import Divider from "../divider/Divider.jsx";
import Timer from "../timer/Timer.jsx";
import FilterCompanyName from "../filters/filter-company-name/FilterCompanyName.jsx";
import FilterStatus from "../filters/filter-status/FilterStatus.jsx";
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {TimerContext} from "../../context/TimerContext.jsx";

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
                <Button styling="default" to="/login">{!user ? "Inloggen" : "Uitloggen"}</Button>
                {isAuthenticated &&
                    <Button styling="default" to="/nieuwe-chat">Nieuwe chat</Button>}
                {user?.role === "admin" &&
                    <>
                        <Divider direction="vertical"/>
                        <Timer/>
                        <Button onClick={registerTime} styling="default">Registreer</Button>
                        <Button onClick={pauseTimer} styling="default">Pauzeer</Button>
                        <Button onClick={startTimer} styling="default">Start</Button>
                        <Divider direction="vertical"/>
                        {error && <p>{error}</p>}
                        {success && <p>{success}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default ControlBar;