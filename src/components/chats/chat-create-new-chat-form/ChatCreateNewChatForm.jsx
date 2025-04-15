import './ChatCreateNewChatForm.css'
import Button from "../../button/Button.jsx";
import InputTextArea from "../../inputs/input-text-area/InputTextArea.jsx";
import Input from "../../inputs/input/Input.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";

function ChatCreateNewChatForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });
    const {
        user
    } = useContext(AuthContext);
    const {
        getValidTeamleaderAccessToken,
        ticketStatuses
    } = useContext(TeamleaderContext);

    async function onCreateChat({ subject, customerId, ticketStatusId, description, accessToken }) {
        try {
            const response = await axios.post(
                'https://api.focus.teamleader.eu/tickets.create',
                {
                    subject,
                    customer: {
                        type: 'company',
                        id: customerId,
                    },
                    ticket_status_id: ticketStatusId,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Ticket succesvol aangemaakt:', response.data);
        } catch (error) {
            console.error('Fout bij het aanmaken van ticket:', error.response?.data || error.message);
        }
    }

    const onSubmit = async (data) => {
        const fullDescription = `Order: ${data.orderNumber}\nOrderregel: ${data.orderLine}\n\n${data.description}`;
        const accessToken = await getValidTeamleaderAccessToken();

        const ticketStatusId = ticketStatuses.find(
            (status) => status.name === "open")?.id;
        console.log(ticketStatuses);
        const customerId = user.info;

        onCreateChat({
            subject: data.subject,
            description: fullDescription,
            accessToken,
            ticketStatusId,
            customerId
        });
    };

    return (
        <div className="new-chat-form-wrapper">
            <form className="new-chat-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Order
                    <Input
                        {...register("orderNumber", { required: "Order is verplicht" })}
                        placeholder="Order"
                        className="full-width"
                    />
                    {errors.orderNumber && <p className="form-error">{errors.orderNumber.message}</p>}
                </label>

                <label>
                    Orderregel
                    <Input
                        {...register("orderLine", { required: "Orderregel is verplicht" })}
                        placeholder="Orderregel"
                        className="full-width"
                    />
                    {errors.orderLine && <p className="form-error">{errors.orderLine.message}</p>}
                </label>

                <label>
                    Onderwerp
                    <Input
                        {...register("subject", { required: "Onderwerp is verplicht" })}
                        placeholder="Onderwerp"
                        className="full-width"
                    />
                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                </label>

                <label>
                    Omschrijving
                    <InputTextArea
                        {...register("description", { required: "Omschrijving is verplicht" })}
                        placeholder="Omschrijf het probleem of de vraag"
                    />
                    {errors.description && <p className="form-error">{errors.description.message}</p>}
                </label>

                <Button type="submit" styling="default">
                    Verstuur
                </Button>
            </form>
        </div>
    );
}

export default ChatCreateNewChatForm;