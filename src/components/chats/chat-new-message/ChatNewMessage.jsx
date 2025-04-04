import './ChatNewMessage.css'
import {useState} from "react";
import Button from "../../buttons/button/Button.jsx";

function ChatNewMessage({selectedChatId, onSend}) {
    const [message, setMessage] = useState("")

    function handleSend(e) {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed) return;

        if (onSend) {
            onSend(trimmed, selectedChatId);
        }

        setMessage("");
    }

    return (
        <form className="chat-new-message" onSubmit={handleSend}>
            <input type="text"
                   className="chat-input"
                   placeholder="Type een bericht..."
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" styling="default">
                Verzenden
            </Button>
        </form>
    )
}

export default ChatNewMessage;