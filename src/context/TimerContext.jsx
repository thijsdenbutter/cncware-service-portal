import {createContext, useEffect, useRef, useState} from "react";


export const TimerContext = createContext({});

export function TimerProvider({ children }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const intervalRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    function startTimer() {
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        setIsRunning(true);
    }

    function pauseTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    }

    function resetTimer() {
        pauseTimer();
        setSeconds(0);
    }

    function registerTime() {

    }



    return (
        <TimerContext.Provider
            value={{
                seconds,
                startTimer,
                pauseTimer,
                selectedChat,
                setSelectedChat
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}