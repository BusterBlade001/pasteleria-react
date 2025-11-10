import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, getCartTotal, clearCart } from '../services/cartService';
import { createOrder } from '../data/database';
import { getCurrentUser } from '../services/authService';

const CartModal = ({ onClose, onUpdate }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [deliveryDate, setDeliveryDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartDisplay = () => {
            const currentCart = getCart();
            setCart(currentCart);
            setTotal(getCartTotal());
            if (onUpdate) onUpdate();
        };
        updateCartDisplay();
    }, [onUpdate]);

    const updateCartDisplay = () => {
        const currentCart = getCart();
        setCart(currentCart);
        setTotal(getCartTotal());
        if (onUpdate) onUpdate();
    };

    const handleRemoveItem = (code, personalization) => {
        removeFromCart(code, personalization);
        updateCartDisplay();
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos para finalizar la compra.');
            return;
        }

        if (!deliveryDate) {
            alert('Por favor, selecciona una fecha de entrega preferida.');
            return;
        }

        const today = new Date();
        const selectedDate = new Date(deliveryDate);
        
        if (selectedDate < today) {
            alert('La fecha de entrega debe ser hoy o posterior.');
            return;
        }

        const currentUser = getCurrentUser();
        
        const orderData = {
            userId: currentUser ? currentUser.id : null,
            userName: currentUser ? currentUser.name : 'Invitado',
            userEmail: currentUser ? currentUser.email : 'invitado@example.com',
            deliveryDate: deliveryDate,
            items: cart,
            total: total
        };

        const newOrder = createOrder(orderData);
        
        // Guardar última orden en localStorage para la página de confirmación
        localStorage.setItem('lastOrder', JSON.stringify(newOrder));
        
        clearCart();
        window.dispatchEvent(new Event('cartUpdated'));
        
        onClose();
        navigate('/checkout-success');
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="cart-modal" style={{ display: 'block' }}>
            <div className="cart-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2 className="section-title">Tu Carrito</h2>
                
                <div id="cart-items">
                    {cart.length === 0 ? (
                        <p>El carrito está vacío.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.code}-${item.personalization}-${index}`} className="cart-item">
                                <div>
                                    <p><strong>{item.name}</strong> x {item.quantity}</p>
                                    {item.personalization && (
                                        <p style={{ fontSize: '0.9rem', color: '#888' }}>
                                            (Mensaje: {item.personalization})
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <p>${(item.price * item.quantity).toLocaleString('es-CL')} CLP</p>
                                    <button 
                                        className="remove-item-btn" 
                                        onClick={() => handleRemoveItem(item.code, item.personalization)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                {cart.length > 0 && (
                    <>
                        <div className="form-group" style={{ marginTop: '1.5rem', textAlign: 'left', padding: '0 1rem' }}>
                            <label htmlFor="delivery-date">Fecha de Entrega Preferida:</label>
                            <input 
                                type="date" 
                                id="delivery-date" 
                                value={deliveryDate}
                                onChange={(e) => setDeliveryDate(e.target.value)}
                                min={getTodayDate()}
                                required 
                            />
                        </div>
                        <div className="cart-summary">
                            <p>Total: <span id="cart-total">${total.toLocaleString('es-CL')} CLP</span></p>
                            <button 
                                id="checkout-btn" 
                                className="btn-submit"
                                onClick={handleCheckout}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
