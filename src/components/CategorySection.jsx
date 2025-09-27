import "../css/CategorySection.css";

const categories = [
    { id: 1, name: "Festive Wear", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500" },
    { id: 2, name: "Jewellery", image: "https://images.unsplash.com/photo-1611652033959-8a8279d45f47?w=500" },
    { id: 3, name: "Home Decor", image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=500" },
    { id: 4, name: "Gifts & Sweets", image: "https://images.unsplash.com/photo-1627808003926-d568c077a285?w=500" },
];

export default function CategorySection() {
    return (
        <section className="categories">
            <h3 className="section-title">Explore The Celebration</h3>
            <div className="category-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="category-card">
                        {/* This new wrapper helps style the image perfectly */}
                        <div className="category-image-wrapper">
                            <img src={cat.image} alt={cat.name} />
                        </div>
                        <p>{cat.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}