import { useState } from "react";
import { ShoppingCart, Search, User, Menu } from "lucide-react";

function Navbar() {
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <Menu className="w-6 h-6 cursor-pointer md:hidden" />
                <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
            </div>
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 mx-6">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent px-2 outline-none flex-1"
                />
            </div>
            <div className="flex items-center gap-6">
                <User className="w-6 h-6 cursor-pointer" />
                <ShoppingCart className="w-6 h-6 cursor-pointer" />
            </div>
        </header>
    );
}


function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white text-center py-24 px-6">
            <h2 className="text-5xl font-bold mb-6">Your One-Stop Shop</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
                Discover the best deals on electronics, fashion, home essentials, and more — all in one place.
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
                Start Shopping
            </button>
        </section>
    );
}

function CategorySection() {
    const categories = [
        { id: 1, name: "Electronics", image: "https://via.placeholder.com/150" },
        { id: 2, name: "Fashion", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Home", image: "https://via.placeholder.com/150" },
        { id: 4, name: "Sports", image: "https://via.placeholder.com/150" },
    ];

    return (
        <section className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Shop by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="text-center cursor-pointer group">
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-32 object-cover rounded-lg shadow group-hover:scale-105 transition"
                        />
                        <p className="mt-2 font-medium">{cat.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProductGrid() {
    const [products] = useState([
        { id: 1, name: "Wireless Headphones", price: "$99", image: "https://via.placeholder.com/200" },
        { id: 2, name: "Smart Watch", price: "$149", image: "https://via.placeholder.com/200" },
        { id: 3, name: "Gaming Mouse", price: "$49", image: "https://via.placeholder.com/200" },
        { id: 4, name: "Bluetooth Speaker", price: "$79", image: "https://via.placeholder.com/200" },
        { id: 5, name: "Laptop", price: "$899", image: "https://via.placeholder.com/200" },
        { id: 6, name: "Tablet", price: "$499", image: "https://via.placeholder.com/200" },
    ]);

    return (
        <section className="p-8 bg-gray-50">
            <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                        <p className="text-blue-600 font-bold">{product.price}</p>
                        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 text-center p-8 mt-8">
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-4">
                <a href="#" className="hover:text-white">About Us</a>
                <a href="#" className="hover:text-white">Careers</a>
                <a href="#" className="hover:text-white">Contact</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
            <p>&copy; 2025 ShopEase. All rights reserved.</p>
        </footer>
    );
}

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Hero />
            <CategorySection />
            <ProductGrid />
            <Footer />
        </div>
    );
}