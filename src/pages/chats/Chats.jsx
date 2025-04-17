import './Chats.css';
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import Chat from "../../components/chats/chat/Chat.jsx";
import {useContext, useEffect} from "react";
import {TimerContext} from "../../context/TimerContext.jsx";
import {TeamleaderContext} from "../../context/TeamleaderContext.jsx";

function Chats() {

    const {
        selectedChat
    } = useContext(TimerContext);

    const {
        fetchTicketStatuses
    } = useContext(TeamleaderContext);

    useEffect(() => {
        fetchTicketStatuses();
    },[]);

    return (
        <div className="chats-layout">
            <ChatBar/>
            {selectedChat.id && (
                <Chat/>
            )}
        </div>
    );
}

export default Chats;