import { useState } from "react";
import "./Login.css";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/buttons/button/Button.jsx";
import { useForm } from "react-hook-form";

function LoginForm({ onLogin, onRegister }) {
    const [isRegistering, setIsRegistering] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        if (isRegistering) {
            onRegister({
                email: data.email,
                password: data.password,
                company: data.company
            });
        } else {
            onLogin({
                email: data.email,
                password: data.password
            });
        }
    };

    const password = watch("password");

    return (
        <div className="login-form-wrapper">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    E-mailadres
                <Input
                    placeholder="E-mailadres"
                    {...register("email", {
                        required: "E-mailadres is verplicht",
                        pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: "Ongeldig e-mailadres"
                        }
                    })}
                />
                </label>
                {errors.email && <p className="form-error">{errors.email.message}</p>}

                {isRegistering && (
                    <>
                        <label>
                            Bedrijfsnaam
                        <Input
                            placeholder="Bedrijfsnaam"
                            {...register("company", {
                                required: "Bedrijfsnaam is verplicht"
                            })}
                        />
                        </label>
                        {errors.company && <p className="form-error">{errors.company.message}</p>}
                    </>
                )}

                <label>
                    Wachtwoord
                <Input
                    type="password"
                    placeholder="Wachtwoord"
                    {...register("password", {
                        required: "Wachtwoord is verplicht",
                        minLength: {
                            value: 6,
                            message: "Minimaal 6 tekens"
                        }
                    })}
                />
                    </label>
                {errors.password && <p className="form-error">{errors.password.message}</p>}

                {isRegistering && (
                    <>
                        <label>
                            Herhaal wachtwoord
                        <Input
                            type="password"
                            placeholder="Herhaal wachtwoord"
                            {...register("repeatPassword", {
                                validate: (value) =>
                                    value === password || "Wachtwoorden komen niet overeen"
                            })}
                        />
                        </label>
                        {errors.repeatPassword && (
                            <p className="form-error">{errors.repeatPassword.message}</p>
                        )}
                    </>
                )}

                <Button type="submit" styling="default">
                    {isRegistering ? "Registreer" : "Log in"}
                </Button>

                <p className="form-toggle">
                    {isRegistering ? (
                        <>
                            Al een account?{" "}
                            <span onClick={() => setIsRegistering(false)}>Log in</span>
                        </>
                    ) : (
                        <>
                            Nog geen account?{" "}
                            <span onClick={() => setIsRegistering(true)}>Registreer</span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
