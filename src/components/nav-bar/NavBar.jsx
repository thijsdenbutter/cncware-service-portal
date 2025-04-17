import './NavBar.css';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/Button.jsx";

function NavBar() {

    const {user} = useContext(AuthContext);

    return (
        <nav className="nav-bar">
            <ul>
                {user?.role === "admin" &&
                    <li>
                        <Button
                            styling="default"
                            to="/bedrijven"
                            variant="fullwidth"
                        >Klanten</Button>
                    </li>}
                <li>
                    <Button
                        styling="default"
                        to="/chats"
                        variant="fullwidth"
                    >Chats</Button>
                </li>
                <li>
                    <Button
                        styling="default"
                        to="/products"
                        variant="fullwidth"
                    >Producten</Button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;