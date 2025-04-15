import {createContext, useRef, useState} from "react";


export const TimerContext = createContext({});

export function TimerProvider({ children }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const intervalRef = useRef(null);

    function startTimer() {
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        setIsRunning(true);
    }

    return (
        <TimerContext.Provider
            value={{
                seconds,
                startTimer,
                setSeconds,
                selectedChat,
                setSelectedChat
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}