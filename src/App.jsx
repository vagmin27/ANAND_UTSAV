import './css/App.css'
import HomePage from './pages/home'
import FestiveAuth from './pages/FestiveAuth';
import { Routes, Route } from "react-router-dom"

function App() {
    return (
        <><div>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<FestiveAuth />} />
                </Routes>
            </main>
        </div>
        </>);
}

export default App
