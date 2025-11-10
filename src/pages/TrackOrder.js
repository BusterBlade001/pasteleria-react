import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByTrackingNumber } from '../data/database';

const TrackOrder = () => {
    const { trackingNumber } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (trackingNumber) {
            searchOrder(trackingNumber);
        }
    }, [trackingNumber]);

    const searchOrder = (tracking) => {
        const foundOrder = getOrderByTrackingNumber(tracking);
        if (foundOrder) {
            setOrder(foundOrder);
            setNotFound(false);
        } else {
            setOrder(null);
            setNotFound(true);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/seguimiento/${searchTerm.trim()}`);
        }
    };

    const getStatusProgress = (status) => {
        const statuses = {
            'Preparación': 33,
            'En Camino': 66,
            'Entregado': 100,
            'Cancelado': 0
        };
        return statuses[status] || 0;
    };

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Seguimiento de Pedido</h1>
            
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label htmlFor="tracking-search">Ingresa tu número de seguimiento:</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input 
                                type="text" 
                                id="tracking-search"
                                placeholder="Ej: PS-12345678"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1 }}
                            />
                            <button type="submit" className="btn-submit">Buscar</button>
                        </div>
                    </div>
                </form>

                {notFound && (
                    <div style={{ 
                        background: '#ffebee', 
                        color: '#c62828', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        No se encontró ningún pedido con ese número de seguimiento.
                    </div>
                )}

                {order && (
                    <div style={{ 
                        background: 'white', 
                        padding: '2rem', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <h2>Pedido #{order.trackingNumber}</h2>
                        
                        <div style={{ marginTop: '1.5rem' }}>
                            <p><strong>Fecha del Pedido:</strong> {order.date}</p>
                            <p><strong>Fecha de Entrega:</strong> {order.deliveryDate}</p>
                            <p><strong>Cliente:</strong> {order.userName}</p>
                            <p><strong>Total:</strong> ${order.total.toLocaleString('es-CL')} CLP</p>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3>Estado del Pedido</h3>
                            <div style={{ 
                                background: '#f5f5f5', 
                                padding: '1rem', 
                                borderRadius: '4px',
                                marginTop: '1rem'
                            }}>
                                <p style={{ 
                                    fontSize: '1.2rem', 
                                    fontWeight: 'bold',
                                    color: order.status === 'Cancelado' ? '#e74c3c' : '#4caf50'
                                }}>
                                    {order.status}
                                </p>
                                
                                {order.status !== 'Cancelado' && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <div style={{ 
                                            background: '#ddd', 
                                            height: '10px', 
                                            borderRadius: '5px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{ 
                                                background: '#4caf50', 
                                                height: '100%', 
                                                width: `${getStatusProgress(order.status)}%`,
                                                transition: 'width 0.3s ease'
                                            }}></div>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            marginTop: '0.5rem',
                                            fontSize: '0.8rem'
                                        }}>
                                            <span>Preparación</span>
                                            <span>En Camino</span>
                                            <span>Entregado</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3>Productos</h3>
                            {order.items.map((item, index) => (
                                <div key={index} style={{ 
                                    borderBottom: '1px solid #eee', 
                                    padding: '0.5rem 0' 
                                }}>
                                    <p>
                                        <strong>{item.name}</strong> x {item.quantity}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                        ${(item.price * item.quantity).toLocaleString('es-CL')} CLP
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default TrackOrder;
