import './Chats.css'
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import {useState} from "react";
import Chat from "../../components/chats/chat/Chat.jsx";

function Chats() {
    const [selectedChatId, setSelectedChatId] = useState(null);
    return (
        <div className="chats-layout">
            <ChatBar
                selectedChatId={selectedChatId}
                setSelectedChatId={setSelectedChatId}
            />
            {selectedChatId && (
                <Chat
                selectedChatId={selectedChatId}
                />
            )}
        </div>
    )
}

export default Chats