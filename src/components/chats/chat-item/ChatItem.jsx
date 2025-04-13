import './ChatItem.css'
import ChatMeta from "../chat-meta/ChatMeta.jsx";

function ChatItem({ticket, isSelected, onClick, selectedChat}) {
    return (
        <div className={`chat-item ${isSelected ? "selected" : ""}`}
             onClick={onClick}>
            {ticket.company?.id &&
                <ChatMeta
                    label="Bedrijf"
                    value={ticket.company.name}
                    multiline={isSelected}/>}
            {ticket.customer?.id &&
                <ChatMeta
                    label="Contact"
                    value={ticket.customer.name}
                    multiline={isSelected}/>}
            <ChatMeta
                label="Onderwerp"
                value={ticket.subject}
                multiline={isSelected}/>
            {isSelected && selectedChat.description &&
                <ChatMeta
                    label="Beschrijving"
                    value={selectedChat.description}
                    multiline={isSelected}/>}
        </div>
    )
}

export default ChatItem;