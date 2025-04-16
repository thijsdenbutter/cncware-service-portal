import {createContext, useContext, useEffect, useRef, useState} from "react";
import {fetchCurrentUser} from "../helpers/teamleader/fetchCurrentUser.js";
import {TeamleaderContext} from "./TeamleaderContext.jsx";
import {registerTimeTracking} from "../helpers/teamleader/registerTimeTracking.js";
import formatDateTimeWithOffset from "../helpers/formatDateTimeWithOffset.js";


export const TimerContext = createContext({});

export function TimerProvider({children}) {
    const [startTime, setStartTime] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedChat, setSelectedChat] = useState({});

    const {
        getValidTeamleaderAccessToken
    } = useContext(TeamleaderContext);

    const intervalRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    function startTimer() {
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        setStartTime(formatDateTimeWithOffset());
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

    async function registerTime() {

        const token = await getValidTeamleaderAccessToken();

        if (!token) throw new Error("Geen geldige token");

        try {
            const user = await fetchCurrentUser(token);
            console.log("user :", user);

            const userId = user?.id;
            if (!userId) throw new Error("Geen geldig user ID gevonden");

            const result = await registerTimeTracking({
                userId,
                ticketId: selectedChat.id,
                startedAt: startTime,
                duration: seconds,
                token
            })

            console.log("✅ Tijd geregistreerd:", result);
            resetTimer();

        } catch (err) {
            console.error("❌ Tijdregistratie mislukt:", err);
            throw err;
        }
    }

    return (
        <TimerContext.Provider
            value={{
                seconds,
                startTimer,
                pauseTimer,
                registerTime,
                selectedChat,
                setSelectedChat
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}