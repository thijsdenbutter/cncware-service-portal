import './Chats.css'
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import {useState} from "react";

function Chats() {
    const [selectedChatId, setSelectedChatId] = useState(null);
    return (
        <div className="chats-layout">
            <ChatBar
                selectedChatId={selectedChatId}
                setSelectedChatId={setSelectedChatId}
            />
        </div>
    )
}

export default Chats