import './Chat.css';
import ChatMessage from "../chat-message/ChatMessage.jsx";
import ChatNewMessage from "../chat-new-message/ChatNewMessage.jsx";
import {useContext, useEffect, useState} from "react";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {TimerContext} from "../../../context/TimerContext.jsx";
import {fetchTicketMessages} from "../../../helpers/teamleader/fetchTicketMessages.js";
import {fetchTicketInfo} from "../../../helpers/teamleader/fetchTicketInfo.js";
import {createNewTicketMessage} from "../../../helpers/teamleader/createNewTicketMessage.js";

function Chat() {
    const [chatError, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        getValidTeamleaderAccessToken
    } = useContext(TeamleaderContext);

    const {
        user
    } = useContext(AuthContext);

    const {
        selectedChat,
        setSelectedChat
    } = useContext(TimerContext);

    useEffect(() => {
        async function fetchChatData() {
            if (!selectedChat?.id) return;

            setLoading(true);
            setError(null);

            try {
                const token = await getValidTeamleaderAccessToken();
                if (!token) throw new Error("Geen toegangstoken gevonden.");

                const [fetchedMessages, ticketInfo] = await Promise.all([
                    fetchTicketMessages({ticketId: selectedChat.id, token}),
                    fetchTicketInfo({ticketId: selectedChat.id, token})
                ]);

                setMessages(fetchedMessages);

                setSelectedChat((prev) => ({
                    ...prev,
                    description: ticketInfo.description
                }));

            } catch (err) {
                console.error("❌ Chat laden mislukt:", err);
                setError("Fout bij laden van de chat.");
            } finally {
                setLoading(false);
            }
        }

        fetchChatData();
    }, [selectedChat?.id]);

    async function handleSendMessage(body) {
        setError(null);
        try {
            const token = await getValidTeamleaderAccessToken();
            if (!token) throw new Error("Geen toegangstoken gevonden.");

            console.log("user:", user);

            await createNewTicketMessage({
                token,
                ticketId: selectedChat.id,
                message: body,
                senderId: user.info
            });

            const refreshedMessages = await fetchTicketMessages({ticketId: selectedChat.id, token});
            setMessages(refreshedMessages);

        } catch (err) {
            console.error("❌ Bericht verzenden mislukt:", err);
            setError("Fout bij verzenden van het bericht.");
        }
    }

    return (
        <div className="chat-layout">
            {chatError && <p>{chatError}</p>}
            {loading &&
                <div className="chat-messages">
                    <p>Berichten worden geladen...</p>
                </div>
            }

            {!loading && !chatError && (
                <div className="chat-messages">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={message.body}
                                sender={message.sent_by}
                            />
                        ))
                    ) : (
                        <p>Nog geen berichten...</p>
                    )}
                </div>
            )}
            <div>
                <ChatNewMessage
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    );
}

export default Chat;