import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import Chats from "./pages/chats/Chats.jsx";
import NewChat from "./pages/newChat/NewChat.jsx";
import Login from "./pages/login/Login.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import NavBar from "./components/nav-bar/NavBar.jsx";
import ControlBar from "./components/control-bar/ControlBar.jsx";
import TeamleaderRedirection from "./pages/teamleader-redirection/TeamleaderRedirection.jsx";

function App() {

    return (
        <div className="app-outer-container">
            <ControlBar/>
            <div className="app-inner-container">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/chats" element={<Chats/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/nieuwe-chat" element={<NewChat/>}/>
                    <Route path="/teamleader-auth" element={<TeamleaderRedirection/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default App
