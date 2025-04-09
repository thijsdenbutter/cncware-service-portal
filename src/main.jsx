import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {FilterProvider} from "./context/FilterContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {TeamleaderProvider} from "./context/TeamleaderContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <Router>
            <TeamleaderProvider>
                <FilterProvider>
                    <App/>
                </FilterProvider>
            </TeamleaderProvider>
        </Router>
    </AuthProvider>
)
