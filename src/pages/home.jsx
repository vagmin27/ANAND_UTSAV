import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ServiceGrid from '../components/ServiceGrid';
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Hero />
            <CategorySection />
            <ServiceGrid />
            <Footer />
        </div>
    );
}
