import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/home/Home.jsx";
import Chats from "./pages/chats/Chats.jsx";
import NewChat from "./pages/newChat/NewChat.jsx";
import Login from "./pages/login/Login.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/chats" element={<Chats />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new-chat" element={<NewChat />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
  )
}

export default App
