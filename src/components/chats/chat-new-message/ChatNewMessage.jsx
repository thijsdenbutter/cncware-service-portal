import './ChatNewMessage.css';
import {useState} from "react";
import Button from "../../button/Button.jsx";
import Input from "../../inputs/input/Input.jsx";

function ChatNewMessage({onSend}) {
    const [message, setMessage] = useState("");
    const [emptyError, setEmptyError] = useState(false);

    function handleSend(e) {
        e.preventDefault();
        const trimmed = message.trim();

        if (!trimmed) {
            setEmptyError(true);
            return;
        }

        setEmptyError(false);

        onSend(trimmed);
        setMessage("");
    }

    return (
        <form className="chat-new-message" onSubmit={handleSend}>
            <Input type="text"
                   className={`full-height full-width ${emptyError ? 'input-error' : ''}`.trim()}
                   placeholder="Type een bericht..."
                   value={message}
                   onChange={(e) => {
                       setMessage(e.target.value);
                       if (emptyError) setEmptyError(false);
                   }}
                   onBlur={() => {
                       setEmptyError(false);
                   }}
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