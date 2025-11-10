import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../data/database';
import ProductCard from '../components/ProductCard';

const CategoryView = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const decodedCategory = decodeURIComponent(category);
        const categoryProducts = getProductsByCategory(decodedCategory);
        
        if (categoryProducts.length === 0) {
            alert('Categoría no encontrada');
            navigate('/categorias');
        } else {
            setProducts(categoryProducts);
        }
    }, [category, navigate]);

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <button 
                className="btn-secondary" 
                onClick={() => navigate('/categorias')}
                style={{ marginBottom: '1rem' }}
            >
                ← Volver a Categorías
            </button>
            
            <h1 className="section-title">{decodeURIComponent(category)}</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {products.length} productos en esta categoría
            </p>
            
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
};

export default CategoryView;
