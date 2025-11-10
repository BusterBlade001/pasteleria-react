import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct, getCategories } from '../../data/database';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = getCategories();

    const loadProducts = () => {
        const allProducts = getAllProducts();
        setProducts(allProducts);
    };

    // Efecto 1: Carga inicial de datos
    useEffect(() => {
        loadProducts();
    }, []);

    // CORRECCIÓN ESLINT: Efecto 2: Ejecuta la lógica de filtrado cuando cambian los estados
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.code.toLowerCase().includes(term)
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);
    
    // NOTA: La función filterProducts original ha sido eliminada para evitar la advertencia de 'unused'.
    // Su lógica se ha movido al useEffect anterior.

    const handleDelete = (id, name) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) {
            deleteProduct(id);
            loadProducts();
            alert('Producto eliminado exitosamente');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="section-title" style={{ margin: 0 }}>Gestión de Productos</h1>
                <div>
                    <Link to="/admin" className="btn-secondary" style={{ marginRight: '1rem' }}>
                        ← Volver al Panel
                    </Link>
                    <Link to="/admin/productos/nuevo" className="btn-submit">
                        + Nuevo Producto
                    </Link>
                </div>
            </div>

            {/* Filtros */}
            <div className="filters" style={{ marginBottom: '2rem' }}>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas las Categorías</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Tabla de productos */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Código</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Nombre</th>
                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Categoría</th>
                            <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Precio</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Stock</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Destacado</th>
                            <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{product.code}</td>
                                    <td style={{ padding: '1rem' }}>{product.name}</td>
                                    <td style={{ padding: '1rem' }}>{product.category}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        ${product.price.toLocaleString('es-CL')}
                                    </td>
                                    <td style={{ 
                                        padding: '1rem', 
                                        textAlign: 'center',
                                        color: product.stock < 5 ? '#e74c3c' : 'inherit',
                                        fontWeight: product.stock < 5 ? 'bold' : 'normal'
                                    }}>
                                        {product.stock}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {product.featured ? '⭐' : '-'}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <Link 
                                            to={`/admin/productos/editar/${product.id}`}
                                            className="btn-secondary"
                                            style={{ marginRight: '0.5rem', fontSize: '0.9rem' }}
                                        >
                                            Editar
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(product.id, product.name)}
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
                                    No se encontraron productos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p style={{ marginTop: '1rem', color: '#666' }}>
                Total de productos: {filteredProducts.length}
            </p>
        </div>
    );
};

export default AdminProducts;