import './NavBar.css'
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="nav-bar">
            <ul>
                <li>
                    <NavLink to="/">Customers</NavLink>
                </li>
                <li>
                    <NavLink to="/chats">Chats</NavLink>
                </li>
                <li>
                    <NavLink to="/products">Products</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar