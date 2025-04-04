import './ChatMessage.css'
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";

function ChatMessage({message, sender}) {

    const {user} = useContext(AuthContext)
    const myId = user?.id

    return (
        <div className={`chat-message ${sender.id === myId ? "is-mine" : "is-not-mine"}`}>{message}</div>
    )
}

export default ChatMessage;