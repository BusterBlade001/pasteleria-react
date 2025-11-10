import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// CORRECCIÓN: Cambiar 'updateQuantity' por 'updateCartItemQuantity'
import { getCart, removeFromCart, updateCartItemQuantity, getCartTotal } from '../services/cartService';

const CartModal = ({ onClose, onUpdate }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(getCart());
    const [total, setTotal] = useState(getCartTotal());

    useEffect(() => {
        const updateCartDisplay = () => {
            const currentCart = getCart();
            setCart(currentCart);
            setTotal(getCartTotal());
            if (onUpdate) onUpdate();
        };
        updateCartDisplay();
        
        // Listener para actualizar el carrito si se añade algo desde ProductDetail, etc.
        const handleCartUpdate = () => {
            setCart(getCart());
            setTotal(getCartTotal());
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [onUpdate]);

    // CORRECCIÓN 1: Asegurarse de que handleRemoveItem reciba 'personalization'
    const handleRemoveItem = (code, personalization) => {
        removeFromCart(code, personalization);
        setCart(getCart());
        setTotal(getCartTotal());
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // CORRECCIÓN 2: Asegurarse de que handleQuantityChange use 'updateCartItemQuantity' 
    // y reciba 'personalization'
    const handleQuantityChange = (productCode, personalization, quantity) => {
        const newQuantity = parseInt(quantity);
        if (newQuantity < 1) return;
        
        // Usa la función de servicio con el nombre correcto
        updateCartItemQuantity(productCode, personalization, newQuantity); 
        setCart(getCart());
        setTotal(getCartTotal());
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // La función handleCheckout solo navega al Checkout (implementación correcta del paso anterior)
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos para finalizar la compra.');
            return;
        }
        
        onClose();
        navigate('/checkout'); 
    };

    if (!onClose) return null; // Usamos la prop onClose como bandera de visibilidad

    return (
        <div className="cart-modal" style={{ display: 'block' }}>
            <div className="cart-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2 className="section-title">Tu Carrito</h2>
                
                <div id="cart-items">
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '2rem' }}>El carrito está vacío.</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left' }}>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={`${item.code}-${item.personalization}-${index}`} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ textAlign: 'left', padding: '0.5rem 0' }}>
                                            <strong>{item.name}</strong>
                                            {item.personalization && (
                                                <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>
                                                    (Mensaje: {item.personalization})
                                                </p>
                                            )}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>${item.price.toLocaleString('es-CL')}</td>
                                        <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                                            <input 
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                // CORRECCIÓN 3: Pasar el código, la personalización y el valor
                                                onChange={(e) => handleQuantityChange(item.code, item.personalization, e.target.value)}
                                                style={{ width: '50px', textAlign: 'center' }}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'right', padding: '0.5rem 0' }}>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                                        <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                                            <button 
                                                // CORRECCIÓN 4: Pasar la personalización a handleRemoveItem
                                                onClick={() => handleRemoveItem(item.code, item.personalization)} 
                                                className="remove-item-btn"
                                                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                {cart.length > 0 && (
                    <div className="cart-summary" style={{ marginTop: '1.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'right' }}>
                            Total: <span id="cart-total">${total.toLocaleString('es-CL')} CLP</span>
                        </p>
                        
                        <button 
                            id="checkout-btn" 
                            className="btn-submit"
                            onClick={handleCheckout}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;