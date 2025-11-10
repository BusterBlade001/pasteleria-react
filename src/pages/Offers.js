import React, { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../data/database';
import ProductCard from '../components/ProductCard';

const Offers = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const products = getFeaturedProducts();
        setFeaturedProducts(products);
    }, []);

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Ofertas y Productos Destacados</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Descubre nuestros productos más populares y ofertas especiales
            </p>
            
            <div className="info-block" style={{ marginBottom: '2rem' }}>
                <h3>🎉 Promoción Especial</h3>
                <p>10% de descuento en compras superiores a $50.000</p>
                <p><strong>Código: MIL_SABORES10</strong></p>
                <p style={{ fontSize: '0.9rem' }}>Envío gratis a partir de $80.000 en compras</p>
            </div>
            
            {featuredProducts.length > 0 ? (
                <div className="product-grid">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', padding: '2rem' }}>
                    No hay productos destacados en este momento.
                </p>
            )}
        </main>
    );
};

export default Offers;
