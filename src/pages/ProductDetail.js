import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/database';
import { addToCart } from '../services/cartService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [personalization, setPersonalization] = useState('');

    useEffect(() => {
        const foundProduct = getProductById(id);
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            alert('Producto no encontrado');
            navigate('/');
        }
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (product.stock === 0) {
            alert('Este producto está agotado');
            return;
        }

        if (quantity > product.stock) {
            alert(`Solo hay ${product.stock} unidades disponibles`);
            return;
        }

        addToCart(product, quantity, personalization);
        window.dispatchEvent(new Event('cartUpdated'));
        alert(`${product.name} agregado al carrito`);
        
        // Resetear formulario
        setQuantity(1);
        setPersonalization('');
    };

    if (!product) {
        return (
            <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
                <p>Cargando producto...</p>
            </main>
        );
    }

    return (
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="product-detail-container">
                <div className="product-detail-image">
                    <img src={require(`../img${product.image.startsWith("/") ? product.image : `/${product.image}`}`)} alt={product.name} />
                </div>
                
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p className="product-code">Código: {product.code}</p>
                    <p className="product-category">Categoría: {product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price.toLocaleString('es-CL')} CLP</p>
                    
                    {product.stock > 0 ? (
                        <>
                            <p className="product-stock">Stock disponible: {product.stock} unidades</p>
                            
                            <div className="product-actions">
                                <div className="form-group">
                                    <label htmlFor="quantity">Cantidad:</label>
                                    <input 
                                        type="number" 
                                        id="quantity" 
                                        min="1" 
                                        max={product.stock}
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                
                                {(product.category === "Tortas Especiales" || product.category === "Tortas Cuadradas" || product.category === "Tortas Circulares") && (
                                    <div className="form-group">
                                        <label htmlFor="personalization">Mensaje personalizado (opcional):</label>
                                        <input 
                                            type="text" 
                                            id="personalization" 
                                            placeholder="Ej: Feliz Cumpleaños María"
                                            value={personalization}
                                            onChange={(e) => setPersonalization(e.target.value)}
                                            maxLength="50"
                                        />
                                    </div>
                                )}
                                
                                <button className="btn-submit" onClick={handleAddToCart}>
                                    Agregar al Carrito
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="out-of-stock" style={{ fontSize: '1.2rem', color: '#e74c3c' }}>
                            Producto Agotado
                        </p>
                    )}
                    
                    <button 
                        className="btn-secondary" 
                        onClick={() => navigate(-1)}
                        style={{ marginTop: '1rem' }}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
