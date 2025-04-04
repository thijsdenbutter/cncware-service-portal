import Button from "../button/Button.jsx";

function ButtonStart({intervalRef, setSeconds, setIsRunning}) {

    const startTimer = () => {
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        setIsRunning(true);
    };

    return (
        <Button onClick={startTimer} styling="default">Start</Button>
    );
}

export default ButtonStart