import './NavBar.css';
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {

    const { user } = useContext(AuthContext);

    return (
        <nav className="nav-bar">
            <ul>
                {user?.role === "admin" &&
                <li>
                    <NavLink to="/bedrijven">Klanten</NavLink>
                </li>}
                <li>
                    <NavLink to="/chats">Chats</NavLink>
                </li>
                <li>
                    <NavLink to="/products">Producten</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;