import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';
import { getOrdersByUserId } from '../data/database';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const currentUser = getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
            const userOrders = getOrdersByUserId(currentUser.id);
            setOrders(userOrders);
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
                <p>Cargando perfil...</p>
            </main>
        );
    }

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Mi Perfil</h1>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: '2rem'
                }}>
                    <h2>Información Personal</h2>
                    <div style={{ marginTop: '1rem' }}>
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Rol:</strong> {user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                        <p><strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString('es-CL')}</p>
                    </div>
                    
                    <button 
                        className="btn-secondary" 
                        onClick={handleLogout}
                        style={{ marginTop: '1.5rem' }}
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <div style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2>Mis Pedidos</h2>
                    
                    {orders.length > 0 ? (
                        <div style={{ marginTop: '1rem' }}>
                            {orders.map(order => (
                                <div key={order.id} style={{ 
                                    borderBottom: '1px solid #eee', 
                                    padding: '1rem 0' 
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p><strong>Pedido #{order.trackingNumber}</strong></p>
                                            <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                                Fecha: {order.date} | Total: ${order.total.toLocaleString('es-CL')} CLP
                                            </p>
                                            <p style={{ fontSize: '0.9rem' }}>
                                                Estado: <span style={{ 
                                                    color: order.status === 'Entregado' ? '#4caf50' : '#ff9800',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {order.status}
                                                </span>
                                            </p>
                                        </div>
                                        <button 
                                            className="btn-secondary"
                                            onClick={() => navigate(`/seguimiento/${order.trackingNumber}`)}
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ marginTop: '1rem', color: '#666' }}>
                            Aún no has realizado ningún pedido.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Profile;
