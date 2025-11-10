import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutFailure = () => {
    const navigate = useNavigate();
    // Simulación del número de pedido fallido
    const trackingNumber = '20240705'; 

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="failure-container" style={{ 
                textAlign: 'center', 
                maxWidth: '600px', 
                margin: '0 auto',
                padding: '2rem',
                background: '#fef3f2',
                borderRadius: '8px',
                border: '2px solid #e74c3c'
            }}>
                <h1 style={{ color: '#e74c3c', fontSize: '2.5rem' }}>❌</h1>
                <h2>¡Pago Fallido!</h2>
                <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
                    No se pudo procesar el pago para el pedido N° **#{trackingNumber}**.
                </p>
                
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" className="btn-secondary">
                        ← Volver al Inicio
                    </Link>
                    <button 
                        onClick={() => navigate('/checkout')} 
                        className="btn-submit"
                        style={{ marginLeft: '1rem', background: '#e74c3c' }}
                    >
                        VOLVER A REALIZAR EL PAGO
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CheckoutFailure;