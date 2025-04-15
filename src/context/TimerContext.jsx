import {createContext, useRef, useState} from "react";


export const TimerContext = createContext({});

export function TimerProvider({ children }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const intervalRef = useRef(null);

    return (
        <TimerContext.Provider
            value={{
                seconds,
                selectedChat,
                setSelectedChat
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}