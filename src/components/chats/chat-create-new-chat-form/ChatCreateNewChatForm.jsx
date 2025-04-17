import './ChatCreateNewChatForm.css';
import Button from "../../button/Button.jsx";
import InputTextArea from "../../inputs/input-text-area/InputTextArea.jsx";
import Input from "../../inputs/input/Input.jsx";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import {TeamleaderContext} from "../../../context/TeamleaderContext.jsx";
import {createNewTicket} from "../../../helpers/teamleader/createNewTicket.js";

function ChatCreateNewChatForm() {
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);

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

    const onSubmit = async (data) => {
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const fullDescription = `Order: ${data.orderNumber}\nOrderregel: ${data.orderLine}\n\n${data.description}`;
            const accessToken = await getValidTeamleaderAccessToken();

            const ticketStatusId = ticketStatuses.find(
                (status) => status.name === "open")?.id;

            if (!ticketStatusId) throw new Error("Ticket status 'open' niet gevonden");

            const customerId = user.info;

            await createNewTicket({
                subject: data.subject,
                description: fullDescription,
                accessToken,
                ticketStatusId,
                customerId
            });

            setSubmitSuccess(true);

        } catch (error) {
            console.error('❌ Fout bij het aanmaken van ticket:', error);
            setSubmitError(error.message || "Er is iets misgegaan.");
        }
    };

    if (submitSuccess){
    return (<p className="form-success">✅ Ticket succesvol aangemaakt!</p>);
    }

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

                {submitError && <p className="form-error">{submitError}</p>}

                <Button type="submit" styling="default">
                    Verstuur
                </Button>
            </form>
        </div>
    );
}

export default ChatCreateNewChatForm;