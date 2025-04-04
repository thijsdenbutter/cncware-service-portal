import Button from "../button/Button.jsx";

function ButtonStop({intervalRef, setIsRunning}) {

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    return (
        <Button onClick={stopTimer}>Stop</Button>
    );
}
export default ButtonStop