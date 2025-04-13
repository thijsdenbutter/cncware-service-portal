import './ChatCreateNewChatForm.css'
import Button from "../../buttons/button/Button.jsx";
import InputTextArea from "../../inputs/input-text-area/InputTextArea.jsx";
import Input from "../../inputs/input/Input.jsx";
import {useForm} from "react-hook-form";


function ChatCreateNewChatForm({ onCreateChat }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        const fullDescription = `Order: ${data.orderNumber}\nOrderregel: ${data.orderLine}\n\n${data.description}`;
        onCreateChat({
            subject: data.subject,
            description: fullDescription,
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