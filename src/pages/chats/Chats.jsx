import './Chats.css'
import ChatBar from "../../components/chats/chat-bar/ChatBar.jsx";
import {useContext, useEffect, useState} from "react";
import Chat from "../../components/chats/chat/Chat.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function Chats() {
    const [selectedChatId, setSelectedChatId] = useState(null);

    const {login} = useContext(AuthContext)

    useEffect(() => {
        login({
            type: "user",
            id: "c51ac3a4-1db6-0376-9350-4b8afc070afc",
            name: "Supportmedewerker"
        })
    }, [])

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

export default Chats;