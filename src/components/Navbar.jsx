function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
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
        </nav>
    );
}
