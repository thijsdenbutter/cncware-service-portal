import './LoginForm.css'
import Input from "../inputs/input/Input.jsx";
import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const {
        user,
        login: onLogin,
        logout: onLogout,
        register: onRegister,
        authError,
        setAuthError,
        status
    } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        if (isRegistering) {
            onRegister({
                email: data.email,
                password: data.password,
                company: data.company,
            }, navigate);
        } else {
            onLogin({
                email: data.email,
                password: data.password
            }, navigate);
        }
    };

    const password = watch("password");

    if (status === "pending") {
        return <p>Authenticatie wordt geladen...</p>;
    }

    if (user) {
        return (
            <div className="login-form">
                <p>Je bent ingelogd als <strong>{user.username}</strong></p>
                <Button onClick={() => onLogout(navigate)} styling="default">
                    Uitloggen
                </Button>
            </div>
        )
    }

    return (
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

            {authError && <p className="form-error">{authError}</p>}

            <p className="form-toggle">
                {isRegistering ? (
                    <>
                        Al een account?{" "}
                        <span onClick={() => {
                            setIsRegistering(false)
                            setAuthError(null)
                        }}>Log in</span>

                    </>
                ) : (
                    <>
                        Nog geen account?{" "}
                        <span onClick={() => {
                            setIsRegistering(true)
                            setAuthError(null)
                        }}>Registreer</span>
                    </>
                )}
            </p>
        </form>
    );
}

export default LoginForm;