import Button from "../button/Button.jsx";

function ButtonRegister({intervalRef, setIsRunning, isRunning, setSeconds}) {

    const registerTimer = () => {
        if (isRunning){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
        }

        /* hier komt de logica om de tijd te registreren */

        setSeconds(0)
    };

    return (
        <Button onClick={registerTimer} styling="default">Registreer</Button>
    );
}

export default ButtonRegister