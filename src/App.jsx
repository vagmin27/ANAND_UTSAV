import './css/App.css';
import HomePage from './pages/home';
import FestiveAuth from './pages/FestiveAuth';
import ProviderAuth from './pages/ProviderAuth';
import AllCategoriesPage from './pages/AllCategoriesPage';
import CategoryServicesPage from './pages/CategoryServicesPage';
import AllServicesPage from './pages/AllServicesPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ScrollToTop from './components/ScrollToTop';
import { Routes, Route } from "react-router-dom";
import MainLayout from './components/MainLayout';
import { UserProvider } from './context/UserContext';
import Favourites from "./pages/Favourites";

import { ServiceProviderProvider } from "./context/ServiceProviderContext.jsx";
import ProviderDashboard from "./pages/ProviderDashboard";
import AddService from "./pages/AddService";

function App() {
  return (
    <>
      <ScrollToTop />
      <UserProvider>
        {/* ✅ Wrap once here so Dashboard & AddService share same context */}
        <ServiceProviderProvider>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<FestiveAuth />} />
            <Route path="/provider-login" element={<ProviderAuth />} />

            {/* Provider Dashboard Routes */}
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/add-service" element={<AddService />} />

            {/* Routes with MainLayout / Navbar */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<AllCategoriesPage />} />
              <Route path="/category/:id" element={<CategoryServicesPage />} />
              <Route path="/service/:id" element={<ServiceDetailsPage />} />
              <Route path="/services" element={<AllServicesPage />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>
          </Routes>
        </ServiceProviderProvider>
      </UserProvider>
    </>
  );
}

export default App;
