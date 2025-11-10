import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStatistics } from '../../data/database';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const statistics = getStatistics();
        setStats(statistics);
    }, []);

    if (!stats) {
        return (
            <div className="container" style={{ paddingTop: '2rem' }}>
                <p>Cargando estadísticas...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 className="section-title">Panel de Administración</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Bienvenido al sistema de gestión de Pastelería Mil Sabores
            </p>

            {/* Estadísticas */}
            <div className="stats-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div className="stat-card" style={{ 
                    background: '#e3f2fd', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '2rem', margin: '0', color: '#1976d2' }}>
                        {stats.totalProducts}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Productos</p>
                </div>

                <div className="stat-card" style={{ 
                    background: '#f3e5f5', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '2rem', margin: '0', color: '#7b1fa2' }}>
                        {stats.totalOrders}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Pedidos</p>
                </div>

                <div className="stat-card" style={{ 
                    background: '#e8f5e9', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '2rem', margin: '0', color: '#388e3c' }}>
                        {stats.totalUsers}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Usuarios</p>
                </div>

                <div className="stat-card" style={{ 
                    background: '#fff3e0', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', margin: '0', color: '#f57c00' }}>
                        ${stats.totalRevenue.toLocaleString('es-CL')}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Ingresos Totales</p>
                </div>

                <div className="stat-card" style={{ 
                    background: '#ffebee', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '2rem', margin: '0', color: '#c62828' }}>
                        {stats.lowStockProducts}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Stock Bajo</p>
                </div>

                <div className="stat-card" style={{ 
                    background: '#fce4ec', 
                    padding: '1.5rem', 
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '2rem', margin: '0', color: '#c2185b' }}>
                        {stats.pendingOrders}
                    </h3>
                    <p style={{ margin: '0.5rem 0 0 0' }}>Pedidos Pendientes</p>
                </div>
            </div>

            {/* Menú de gestión */}
            <div className="admin-menu" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem'
            }}>
                <Link to="/admin/productos" className="admin-menu-card" style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center',
                    transition: 'transform 0.2s'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                    <h3>Gestionar Productos</h3>
                    <p style={{ color: '#666' }}>Crear, editar y eliminar productos</p>
                </Link>

                <Link to="/admin/pedidos" className="admin-menu-card" style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center',
                    transition: 'transform 0.2s'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                    <h3>Gestionar Pedidos</h3>
                    <p style={{ color: '#666' }}>Ver y actualizar estado de pedidos</p>
                </Link>

                <Link to="/admin/usuarios" className="admin-menu-card" style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    textAlign: 'center',
                    transition: 'transform 0.2s'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                    <h3>Gestionar Usuarios</h3>
                    <p style={{ color: '#666' }}>Ver y administrar usuarios</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
