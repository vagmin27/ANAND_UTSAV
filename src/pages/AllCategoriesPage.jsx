import { Link } from 'react-router-dom';
import { allCategories } from '../data/data'; // Import from central data file
import "../css/CategoryStyles.css"; // Reuse the same styles

export default function AllCategoriesPage() {
    return (
        <section className="categories">
            <h3 className="section-title">All Categories</h3>
            <div className="category-grid">
                {allCategories.map(cat => (
                    <Link to={`/category/${cat.id}`} key={cat.id} className="category-card">
                        <img src={cat.image} className="card-background-image" alt={cat.name} />
                        <div className="card-content-overlay">
                            <p className="card-title">{cat.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}