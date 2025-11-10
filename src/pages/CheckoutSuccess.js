import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const lastOrderStr = localStorage.getItem('lastOrder');
        if (lastOrderStr) {
            setOrder(JSON.parse(lastOrderStr));
        } else {
            navigate('/');
        }
    }, [navigate]);

    if (!order) {
        return (
            <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
                <p>Cargando...</p>
            </main>
        );
    }

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="success-container" style={{ 
                textAlign: 'center', 
                maxWidth: '600px', 
                margin: '0 auto',
                padding: '2rem',
                background: '#f0f8f0',
                borderRadius: '8px',
                border: '2px solid #4caf50'
            }}>
                <h1 style={{ color: '#4caf50', fontSize: '2.5rem' }}>✓</h1>
                <h2>¡Compra Exitosa!</h2>
                <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
                    Tu pedido ha sido confirmado exitosamente
                </p>
                
                <div style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '4px', 
                    marginTop: '2rem',
                    textAlign: 'left'
                }}>
                    <h3>Detalles del Pedido</h3>
                    <p><strong>Número de Seguimiento:</strong> {order.trackingNumber}</p>
                    <p><strong>Fecha del Pedido:</strong> {order.date}</p>
                    <p><strong>Fecha de Entrega:</strong> {order.deliveryDate}</p>
                    <p><strong>Estado:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.total.toLocaleString('es-CL')} CLP</p>
                    
                    <div style={{ marginTop: '1rem' }}>
                        <h4>Productos:</h4>
                        {order.items.map((item, index) => (
                            <p key={index} style={{ fontSize: '0.9rem' }}>
                                • {item.name} x {item.quantity} - ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
                            </p>
                        ))}
                    </div>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                    <Link to={`/seguimiento/${order.trackingNumber}`} className="btn-submit">
                        Rastrear mi Pedido
                    </Link>
                    <Link to="/" className="btn-secondary" style={{ marginLeft: '1rem' }}>
                        Volver al Inicio
                    </Link>
                </div>
                
                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
                    Recibirás un correo de confirmación con todos los detalles de tu pedido.
                </p>
            </div>
        </main>
    );
};

export default CheckoutSuccess;
