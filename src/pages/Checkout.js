import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { getCart, getCartTotal, clearCart } from '../services/cartService';
import { createOrder } from '../data/database';

const Checkout = () => {
    const navigate = useNavigate();
    const cart = getCart();
    const total = getCartTotal();
    const currentUser = getCurrentUser();

    const [formData, setFormData] = useState({
        // RELLENO AUTOMÁTICO: Obtiene Nombre y Correo si el usuario está logueado
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        deliveryDate: '',
        address: '',
        department: '',
        region: 'Región Metropolitana de Santiago',
        comuna: 'Cerrillos',
        notes: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (cart.length === 0) {
            alert('El carrito está vacío, volviendo al inicio.');
            navigate('/');
        }
    }, [cart.length, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.deliveryDate || !formData.address) {
            setError('Por favor, completa todos los campos obligatorios (Nombre, Correo, Fecha y Dirección).');
            return;
        }

        const today = new Date();
        const selectedDate = new Date(formData.deliveryDate);
        
        if (selectedDate < today) {
            setError('La fecha de entrega debe ser hoy o posterior.');
            return;
        }

        // LÓGICA DE SIMULACIÓN DE FALLO DE PAGO (para cumplir con el flujo PAGO CON ERROR)
        // Simulamos un fallo si el total es par y supera un límite alto.
        if (total > 80000 && total % 2 === 0) {
            navigate('/checkout-failure');
            return;
        }

        const orderData = {
            userId: currentUser ? currentUser.id : null,
            userName: formData.name,
            userEmail: formData.email,
            deliveryDate: formData.deliveryDate,
            items: cart,
            total: total
        };

        const newOrder = createOrder(orderData);
        
        localStorage.setItem('lastOrder', JSON.stringify(newOrder));
        
        clearCart();
        window.dispatchEvent(new Event('cartUpdated'));
        
        navigate('/checkout-success');
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h1 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Finalizar Compra</h1>
                <p style={{ textAlign: 'left', marginBottom: '1.5rem', color: '#e74c3c', fontWeight: 'bold' }}>
                    Total a pagar: ${total.toLocaleString('es-CL')} CLP
                </p>

                {error && (
                    <div className="error-message" style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    
                    {/* --- Información del Cliente (Figura 6) --- */}
                    <h3>Información del Cliente</h3>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                        {currentUser ? 'Datos precargados. Edita si es necesario.' : 'Completa tu información.'}
                    </p>
                    <div className="form-group">
                        <label htmlFor="name">Nombre Completo *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    {/* --- Dirección de Entrega (Figura 6) --- */}
                    <h3 style={{ marginTop: '2rem' }}>Dirección de Entrega</h3>
                    <div className="form-group">
                        <label htmlFor="address">Calle y Número *</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Ej: Av. Principal 123" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Departamento (Opcional)</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} placeholder="Ej: Depto 603" />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="region">Región</label>
                            <select id="region" name="region" value={formData.region} onChange={handleChange}>
                                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="comuna">Comuna</label>
                            <select id="comuna" name="comuna" value={formData.comuna} onChange={handleChange}>
                                <option value="Cerrillos">Cerrillos</option>
                                <option value="Las Condes">Las Condes</option>
                                <option value="Santiago">Santiago</option>
                            </select>
                        </div>
                    </div>
                    
                    <h3 style={{ marginTop: '2rem' }}>Opciones de Entrega</h3>
                    <div className="form-group">
                        <label htmlFor="delivery-date">Fecha de Entrega Preferida *</label>
                        <input 
                            type="date" 
                            id="delivery-date" 
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            min={getTodayDate()}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Indicaciones para la entrega (Opcional)</label>
                        <textarea id="notes" name="notes" rows="3" value={formData.notes} onChange={handleChange} placeholder="Ej: Dejar con el conserje, llamar antes de llegar." />
                    </div>

                    <button type="submit" className="btn-submit" style={{ width: '100%', marginTop: '2rem' }}>
                        Pagar ahora ${total.toLocaleString('es-CL')}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Checkout;