import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsByCategory } from '../data/database';

const Categories = () => {
    const categories = getCategories();

    const getCategoryProductCount = (category) => {
        return getProductsByCategory(category).length;
    };

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Categorías de Productos</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Explora nuestras diferentes categorías de productos artesanales
            </p>
            
            <div className="categories-grid">
                {categories.map(category => (
                    <Link 
                        key={category} 
                        to={`/categoria/${encodeURIComponent(category)}`} 
                        className="category-card"
                    >
                        <h3>{category}</h3>
                        <p>{getCategoryProductCount(category)} productos disponibles</p>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Categories;
