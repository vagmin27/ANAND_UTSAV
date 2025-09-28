import './css/App.css'
import HomePage from './pages/home'
import FestiveAuth from './pages/FestiveAuth';
import AllCategoriesPage from './pages/AllCategoriesPage';
import AllServicesPage from './pages/AllServicesPage';
import ScrollToTop from './components/ScrollToTop';
import { Routes, Route } from "react-router-dom"

function App() {
    return (
        <><div>
            <main className="main-content">
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<FestiveAuth />} />
                    <Route path="/categories" element={<AllCategoriesPage />} />
                    <Route path="/services" element={<AllServicesPage />} />
                </Routes>
            </main>
        </div>
        </>);
}

export default App
