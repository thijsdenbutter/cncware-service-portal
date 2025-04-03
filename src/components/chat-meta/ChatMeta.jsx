import './ChatMeta.css'

function ChatMeta(label, value) {
    return (
        <div className="chat-meta">
            <p className="chat-meta-label">{label}</p>
            <p className="chat-meta-value">{value}</p>
        </div>
    )
}

export default ChatMeta