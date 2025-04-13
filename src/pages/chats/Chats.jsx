import './Chats.css'
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import {useEffect, useState} from "react";
import Chat from "../../components/chats/chat/Chat.jsx";

function Chats() {
    const [selectedChat, setSelectedChat] = useState({
        id: null,
        description: null
    });

    useEffect(() => {console.log(selectedChat)},[selectedChat]);

    return (
        <div className="chats-layout">
            <ChatBar
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
            />
            {selectedChat.id && (
                <Chat
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
            )}
        </div>
    )
}

export default Chats;