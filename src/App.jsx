import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/home/home.jsx";
import Companies from "./pages/companies/Companies.jsx";
import Chats from "./pages/chats/Chats.jsx";
import NewChat from "./pages/newChat/NewChat.jsx";
import Login from "./pages/login/Login.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import ControlBar from "./components/control-bar/ControlBar.jsx";
import TeamleaderRedirection from "./pages/teamleader-redirection/TeamleaderRedirection.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {

    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <div className="app-outer-container">
            <ControlBar/>
            <div className="app-inner-container">
                {isAuthenticated && <NavBar/>}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/bedrijven" element={isAuthenticated && user.role === "admin" ? <Companies/> : <Login/>}/>
                    <Route path="/chats" element={isAuthenticated ? <Chats/> : <Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/nieuwe-chat" element={isAuthenticated ? <NewChat/> : <Login/>}/>
                    <Route path="/teamleader-auth" element={<TeamleaderRedirection/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </div>

    );
}

export default App;
