import Button from "../button/Button.jsx";
import {useContext} from "react";
import {TimerContext} from "../../../context/TimerContext.jsx";

function ButtonStart() {

    const {
        startTimer
    } = useContext(TimerContext);

    return (
        <Button onClick={startTimer} styling="default">Start</Button>
    );
}

export default ButtonStart