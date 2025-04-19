import './NavBar.css';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/Button.jsx";
import useDeviceType from "../../hooks/useDeviceType.js";

function NavBar() {

    const {
        user
    } = useContext(AuthContext);

    const device = useDeviceType();

    const buttonVariant = device === "mobile" ? "rotated" : "fullwidth";


    return (
        <nav className="nav-bar">
            <ul>
                {user?.role === "admin" &&
                    <li>
                        <Button
                            styling="default"
                            to="/bedrijven"
                            variant={buttonVariant}
                        >Klanten</Button>
                    </li>}
                <li>
                    <Button
                        styling="default"
                        to="/chats"
                        variant={buttonVariant}
                    >Chats</Button>
                </li>
                <li>
                    <Button
                        styling="default"
                        to="/products"
                        variant={buttonVariant}
                    >Producten</Button>
                </li>

                <li>
                    {device !== "desktop" &&
                        <Button
                            styling="default"
                            to="/nieuwe-chat"
                            variant={buttonVariant}
                        >Nieuwe chat</Button>
                    }
                </li>
                <li>
                    {device !== "desktop" &&
                        <Button
                            styling="default"
                            variant={buttonVariant}
                            to="/login">{!user ? "Inloggen" : "Uitloggen"}
                        </Button>
                    }
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;