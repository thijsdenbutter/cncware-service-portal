import './ChatMessage.css'

function ChatMessage({message, sender}) {
    const myId = "user-001"
    return (
        <div className={`chat-message ${sender.id === myId ? "is-mine" : "is-not-mine"}`}>{message}</div>
    )
}

export default ChatMessage;