import './ChatItem.css'
import ChatMeta from "../chat-meta/ChatMeta.jsx";
import {useContext} from "react";
import {TimerContext} from "../../../context/TimerContext.jsx";

function ChatItem({ticket, onClick}) {
    const {
        selectedChat
    } = useContext(TimerContext)

    const isSelected = selectedChat.id === ticket.id;

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