import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, updateOrderStatus, deleteOrder, getOrderStatuses } from '../../data/database';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const statuses = getOrderStatuses();

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        if (statusFilter) {
            setFilteredOrders(orders.filter(o => o.status === statusFilter));
        } else {
            setFilteredOrders(orders);
        }
    }, [statusFilter, orders]);

    const loadOrders = () => {
        const allOrders = getAllOrders();
        setOrders(allOrders);
        setFilteredOrders(allOrders);
    };

    

    const handleStatusChange = (orderId, newStatus) => {
        if (window.confirm(`¿Cambiar el estado del pedido a "${newStatus}"?`)) {
            updateOrderStatus(orderId, newStatus);
            loadOrders();
            alert('Estado actualizado exitosamente');
        }
    };

    const handleDelete = (orderId, trackingNumber) => {
        if (window.confirm(`¿Estás seguro de eliminar el pedido ${trackingNumber}?`)) {
            deleteOrder(orderId);
            loadOrders();
            alert('Pedido eliminado exitosamente');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>Gestión de Pedidos</h1>
                <Link to="/admin" className="btn-secondary">
                    ← Volver al Panel
                </Link>
            </div>

            {/* Filtro por estado */}
            <div style={{ marginBottom: '2rem' }}>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="">Todos los Estados</option>
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Lista de pedidos */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>N° Seguimiento</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Cliente</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Fecha</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Entrega</th>
                            <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Total</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Estado</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{order.trackingNumber}</td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.userName}<br/>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>{order.userEmail}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{order.date}</td>
                                    <td style={{ padding: '1rem' }}>{order.deliveryDate}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        ${order.total.toLocaleString('es-CL')}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <select 
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{ 
                                                padding: '0.3rem', 
                                                borderRadius: '4px',
                                                border: '1px solid #ddd',
                                                background: order.status === 'Entregado' ? '#e8f5e9' : 
                                                           order.status === 'Cancelado' ? '#ffebee' : '#fff3e0'
                                            }}
                                        >
                                            {statuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <Link 
                                            to={`/seguimiento/${order.trackingNumber}`}
                                            className="btn-secondary"
                                            style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}
                                        >
                                            Ver
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(order.id, order.trackingNumber)}
                                            style={{
                                                background: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}>
                                    No se encontraron pedidos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p style={{ marginTop: '1rem', color: '#666' }}>
                Total de pedidos: {filteredOrders.length}
            </p>
        </div>
    );
};

export default AdminOrders;
