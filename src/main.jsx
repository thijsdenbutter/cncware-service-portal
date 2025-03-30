import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {FilterProvider} from "./context/FilterContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <FilterProvider>
                <App/>
            </FilterProvider>
        </Router>
    </StrictMode>,
)
