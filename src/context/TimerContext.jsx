import {createContext, useContext, useEffect, useRef, useState} from "react";
import {fetchCurrentUser} from "../helpers/teamleader/fetchCurrentUser.js";
import {TeamleaderContext} from "./TeamleaderContext.jsx";
import {registerTimeTracking} from "../helpers/teamleader/registerTimeTracking.js";
import formatDateTimeWithOffset from "../helpers/formatDateTimeWithOffset.js";
import {fetchCompanyInfo} from "../helpers/teamleader/fetchCompanyInfo.js";
import {getSupportMinutesForCompanyData} from "../helpers/getSupportMinutesForCompanyData.js";
import {calculateRemainingSupportMinutes} from "../helpers/calculateRemainingSupportMinutes.js";
import {updateSupportMinutesForCompany} from "../helpers/teamleader/updateSupportMinutesForCompany.js";
import getCustomFieldIdByName from "../helpers/getCustomFieldIdByName.js";


export const TimerContext = createContext({});

export function TimerProvider({children}) {
    const [startTime, setStartTime] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState(null);
    const [selectedChat, setSelectedChat] = useState({});

    const {
        getValidTeamleaderAccessToken,
        customFieldsCompanies
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
    }

    function pauseTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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

            const userId = user?.id;
            if (!userId) {
                setError("❌ Geen geldig user ID gevonden.");
                throw new Error("Geen geldig user ID gevonden");
            }

            const result = await registerTimeTracking({
                userId,
                ticketId: selectedChat.id,
                startedAt: startTime,
                duration: seconds,
                token
            });

            if (!selectedChat.company) {
                setError("❌ Tijd registreren is niet mogelijk zonder gekoppeld bedrijf.");
                throw new Error("Tijd registreren is niet mogelijk zonder gekoppeld bedrijf.");
            }

            const companyData = await fetchCompanyInfo(token, selectedChat.company.id);
            const currentSupportMinutes = getSupportMinutesForCompanyData(companyData, customFieldsCompanies);
            const newSupportMinutes = calculateRemainingSupportMinutes(currentSupportMinutes, seconds);

            console.log("customFieldsCompanies: ", customFieldsCompanies);
            const customFieldId = getCustomFieldIdByName(customFieldsCompanies, "Support minuten");
            console.log("customFieldId: ",customFieldId);

            await updateSupportMinutesForCompany({token, companyId: selectedChat.company.id, customFieldId, newValue: newSupportMinutes});


            console.log("✅ Tijd geregistreerd:", result);
            resetTimer();

        } catch (err) {
            console.error("❌ Tijdregistratie mislukt:", err);
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
                setSelectedChat,
                error
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}