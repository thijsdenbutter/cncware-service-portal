import './ChatNewMessage.css';
import {useState} from "react";
import Button from "../../button/Button.jsx";

function ChatNewMessage({onSend}) {
    const [message, setMessage] = useState("");

    function handleSend(e) {
        e.preventDefault();
        const trimmed = message.trim();
        if (!trimmed) return;

        if (onSend) {
            onSend(trimmed);
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
            <Button
                type="submit"
                styling="default"
                variant="compact"
            >
                Verzenden
            </Button>
        </form>
    );
}

export default ChatNewMessage;