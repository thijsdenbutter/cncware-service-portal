import './ChatMessage.css';
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";

function ChatMessage({message, sender}) {

    const {user} = useContext(AuthContext);
    const myId = user?.info;

    return (
        <div className={`chat-message ${sender.id === myId ? "is-mine" : "is-not-mine"}`}>
            <div dangerouslySetInnerHTML={{__html: message}}/>
        </div>
    );
}

export default ChatMessage;