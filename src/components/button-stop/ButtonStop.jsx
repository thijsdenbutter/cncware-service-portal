import Button from "../button/Button.jsx";

function ButtonStop({intervalRef, setIsRunning}) {

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    return (
        <Button caption="Stop" onClick={stopTimer}/>
    );
}
export default ButtonStop