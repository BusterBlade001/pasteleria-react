import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../data/database';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            setFilteredUsers(users.filter(u => 
                u.name.toLowerCase().includes(term) || 
                u.email.toLowerCase().includes(term)
            ));
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);

    const loadUsers = () => {
        const allUsers = getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
    };

    

    const handleDelete = (userId, userName, userEmail) => {
        if (userEmail === 'admin@pasteleria.cl') {
            alert('No se puede eliminar el usuario administrador principal');
            return;
        }

        if (window.confirm(`¿Estás seguro de eliminar al usuario "${userName}"?`)) {
            deleteUser(userId);
            loadUsers();
            alert('Usuario eliminado exitosamente');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>Gestión de Usuarios</h1>
                <Link to="/admin" className="btn-secondary">
                    ← Volver al Panel
                </Link>
            </div>

            {/* Búsqueda */}
            <div style={{ marginBottom: '2rem' }}>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: '100%', 
                        maxWidth: '400px',
                        padding: '0.5rem', 
                        borderRadius: '4px', 
                        border: '1px solid #ddd' 
                    }}
                />
            </div>

            {/* Tabla de usuarios */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ID</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Nombre</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Rol</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Fecha de Registro</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{user.id}</td>
                                    <td style={{ padding: '1rem' }}>{user.name}</td>
                                    <td style={{ padding: '1rem' }}>{user.email}</td>
                                    <td style={{ 
                                        padding: '1rem', 
                                        textAlign: 'center',
                                        fontWeight: user.role === 'admin' ? 'bold' : 'normal',
                                        color: user.role === 'admin' ? '#1976d2' : 'inherit'
                                    }}>
                                        {user.role === 'admin' ? '👑 Admin' : 'Cliente'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {new Date(user.createdAt).toLocaleDateString('es-CL')}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {user.email !== 'admin@pasteleria.cl' ? (
                                            <button 
                                                onClick={() => handleDelete(user.id, user.name, user.email)}
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
                                        ) : (
                                            <span style={{ color: '#888', fontSize: '0.9rem' }}>Protegido</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p style={{ marginTop: '1rem', color: '#666' }}>
                Total de usuarios: {filteredUsers.length}
            </p>
        </div>
    );
};

export default AdminUsers;
