import './Chats.css';
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import Chat from "../../components/chats/chat/Chat.jsx";
import {useContext, useEffect} from "react";
import {TimerContext} from "../../context/TimerContext.jsx";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";
import useDeviceType from "../../hooks/useDeviceType.js";
import {Route, Routes} from "react-router-dom";

function Chats() {

    const {
        selectedChat
    } = useContext(TimerContext);

    const {
        fetchTicketStatuses
    } = useContext(TeamleaderContext);

    const device = useDeviceType();

    useEffect(() => {
        fetchTicketStatuses();
    }, []);

    return (
        <div className="chats-layout">
            <Routes>
                {device === "mobile" ? (
                    <>
                        <Route path="/" element={<ChatBar/>}/>
                        <Route path=":chatId" element={<Chat/>}/>
                    </>
                ) : (
                    <Route
                        path="*"
                        element={
                            <>
                                <ChatBar/>
                            {selectedChat.id && (
                                <Chat/>)}
                            </>
                        }
                    />
                )}
            </Routes>
        </div>
    );
}

export default Chats;