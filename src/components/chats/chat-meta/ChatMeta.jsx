import './ChatMeta.css'

function ChatMeta({label, value, multiline = false }) {
    return (
        <div className="chat-meta">
            <p className="chat-meta-label">{label}</p>
            <p className={`chat-meta-value ${multiline ? "multiline" : ""}`}>{value}</p>
        </div>
    )
}

export default ChatMeta