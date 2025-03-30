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
        <Button caption="Start" onClick={startTimer}/>
    );
}

export default ButtonStart