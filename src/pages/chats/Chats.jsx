import './Chats.css'
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import Chat from "../../components/chats/chat/Chat.jsx";
import {useContext} from "react";
import {TimerContext} from "../../context/TimerContext.jsx";

function Chats() {

    const {
        selectedChat
    } = useContext(TimerContext);

    return (
        <div className="chats-layout">
            <ChatBar/>
            {selectedChat.id && (
                <Chat/>
            )}
        </div>
    )
}

export default Chats;