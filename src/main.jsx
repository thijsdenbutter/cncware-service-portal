import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {FilterProvider} from "./context/FilterContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {TeamleaderProvider} from "./context/TeamleaderContext.jsx";
import {TimerProvider} from "./context/TimerContext.jsx";

createRoot(document.getElementById('root')).render(
    <TeamleaderProvider>
        <AuthProvider>
            <Router>
                <TimerProvider>
                    <FilterProvider>
                        <App/>
                    </FilterProvider>
                </TimerProvider>
            </Router>
        </AuthProvider>
    </TeamleaderProvider>
)
