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
        <Button caption="Registreer" onClick={registerTimer}/>
    );
}

export default ButtonRegister