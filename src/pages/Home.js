import React, { useState, useEffect } from 'react';

import { getAllProducts } from '../data/database';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import heroImage from '../img/hero.png';


const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const allProducts = getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
    }, []);

    const filterProducts = () => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.description.toLowerCase().includes(term)
            );
        }

        setFilteredProducts(filtered);
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        const shareText = "¡Descubre la dulzura de la vida con Pastelería Mil Sabores! Te encantarán sus tortas y postres tradicionales.";
        
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: shareText,
                url: shareUrl,
            }).then(() => {
                console.log('Contenido compartido con éxito.');
            }).catch(console.error);
        } else {
            alert("¡Copia este enlace para compartir! " + shareUrl);
        }
    };

    return (
        <main>
            <section id="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div id="hero-content">
                    <h1>¡Celebra la dulzura de la vida con Pastelería Mil Sabores!</h1>
                    <p>Descubre nuestros ingredientes de alta calidad y encarga tu torta especial para crear momentos inolvidables.</p>
                    <div className="social-share">
                        <button id="share-btn" className="btn-share" onClick={handleShare}>
                            Compartir en Redes Sociales
                        </button>
                    </div>
                </div>
            </section>
            
            <section id="info-blocks">
                <div id="discount-block" className="info-block">
                    <h3>10% de dcto. por compras superiores a $50.000</h3>
                    <p>CÓDIGO: **MIL_SABORES10**</p>
                    <p style={{ fontSize: '0.9rem' }}>(Envío gratis a partir de $80.000 en compras)</p>
                </div>
                <div id="special-print-block" className="info-block">
                    <h3>Encarga tu impresión comestible</h3>
                    <p>Personaliza tus tortas con el diseño que quieras</p>
                    <p>Disponible en papel de arroz o azúcar.</p>
                </div>
            </section>
            
            <section id="catalogo" className="container">
                <h2 className="section-title">Nuestro Catálogo</h2>
                
                <ProductFilters 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                
                <div id="product-list" className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>
                            No se encontraron productos que coincidan con tu búsqueda.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Home;
