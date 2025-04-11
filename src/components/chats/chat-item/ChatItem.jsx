import './ChatItem.css'
import ChatMeta from "../chat-meta/ChatMeta.jsx";

function ChatItem({ticket, isSelected, onClick}) {
    return (
        <div className={`chat-item ${isSelected ? "selected" : ""}`}
             onClick={onClick}>
            {ticket.company?.id && <ChatMeta label="Bedrijf" value={ticket.company.name}/>}
            {ticket.customer?.id && <ChatMeta label="Contact" value={ticket.customer.name}/>}
            <ChatMeta label="Onderwerp" value={ticket.subject}/>
        </div>
    )
}

export default ChatItem;