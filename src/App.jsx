import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import Chats from "./pages/chats/Chats.jsx";
import NewChat from "./pages/newChat/NewChat.jsx";
import Login from "./pages/login/Login.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import ControlBar from "./components/controlBar/ControlBar.jsx";

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
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default App
