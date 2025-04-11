import './Chat.css'
import ChatMessage from "../chat-message/ChatMessage.jsx";
import ChatNewMessage from "../chat-new-message/ChatNewMessage.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";
import {AuthContext} from "../../../context/AuthContext.jsx";
import formatDateTimeWithOffset from "../../../helpers/formatDateTimeWithOffset.js";

function Chat({selectedChatId}) {
    const [chatError, setChatError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const {getValidTeamleaderAccessToken} = useContext(TeamleaderContext)
    const {user} = useContext(AuthContext)

        async function fetchMessages() {
            setLoading(true);
            setChatError(null);

            const token = await getValidTeamleaderAccessToken()

            if (!token) {
                setChatError("Geen toegangstoken gevonden.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    "https://api.focus.teamleader.eu/tickets.listMessages",
                    {
                        id: selectedChatId,
                        filter: {
                            type: "customer",
                        },
                        page: {
                            size: 50,
                            number: 1
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(response.data.data);
                setMessages(response.data.data);
            } catch (err) {
                console.error("❌ Fout bij ophalen berichten:", err);
                setChatError("❌ Fout bij ophalen berichten");
            } finally {
                setLoading(false);
            }
        }

    useEffect(() => {

        if (selectedChatId) {
            fetchMessages();
        }
    }, [selectedChatId]);


    async function handleSendMessage(body) {
        const token = await getValidTeamleaderAccessToken();
        if (!token) {
            setChatError("Geen toegangstoken gevonden.");
            return;
        }

        try {
            await axios.post(
                "https://api.focus.teamleader.eu/tickets.importMessage",
                {
                    id: selectedChatId,
                    body: body,
                    sent_by: {
                        type: "user",
                        id: user.id
                    },
                    sent_at: formatDateTimeWithOffset()
                }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            await fetchMessages();

        } catch (err) {
            console.error("❌ Fout bij verzenden bericht:", err);
            setChatError("Fout bij verzenden van het bericht.");
        }
    }


    return (
        <div className="chat-layout">
            {chatError && <p>{chatError}</p>}
            {loading && <p>Berichten worden geladen...</p>}

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
                        <p>Nog geen berichten in dit ticket.</p>
                    )}
                </div>
            )}
            <div>
                <ChatNewMessage
                    selectedChatId={selectedChatId}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    )
}

export default Chat;