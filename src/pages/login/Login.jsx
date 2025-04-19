import "./Login.css";
import LoginForm from "../../components/login-form/LoginForm.jsx";
import {useEffect} from "react";

function Login() {

    useEffect(() => {
        const token = localStorage.getItem("teamleader_token");
        const expiresAt = parseInt(localStorage.getItem("teamleader_token_expires_at") || "0");
        const isValid = token && Date.now() < expiresAt - 60000;

        if (!isValid) {
            window.location.href = "http://localhost:3001/login";
        }
    }, []);


    return (
        <div className="login-form-wrapper">
            <LoginForm/>
        </div>
    );
}

export default Login;
