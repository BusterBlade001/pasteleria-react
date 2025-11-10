import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, createProduct, updateProduct, getCategories } from '../../data/database';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const categories = getCategories();

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        category: '',
        price: '',
        description: '',
        image: '',
        stock: '',
        featured: false
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing) {
            const product = getProductById(id);
            if (product) {
                setFormData({
                    code: product.code,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                    stock: product.stock,
                    featured: product.featured
                });
            } else {
                alert('Producto no encontrado');
                navigate('/admin/productos');
            }
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.name || !formData.category || !formData.price || !formData.description) {
            setError('Por favor, completa todos los campos obligatorios');
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            setError('El precio debe ser mayor a 0');
            return;
        }

        if (parseInt(formData.stock) < 0) {
            setError('El stock no puede ser negativo');
            return;
        }

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock) || 0
        };

        try {
            if (isEditing) {
                updateProduct(id, productData);
                alert('Producto actualizado exitosamente');
            } else {
                createProduct(productData);
                alert('Producto creado exitosamente');
            }
            navigate('/admin/productos');
        } catch (err) {
            setError('Error al guardar el producto');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="section-title" style={{ margin: 0 }}>
                        {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                    </h1>
                    <Link to="/admin/productos" className="btn-secondary">
                        ← Volver
                    </Link>
                </div>

                {error && (
                    <div style={{ 
                        background: '#ffebee', 
                        color: '#c62828', 
                        padding: '1rem', 
                        borderRadius: '4px', 
                        marginBottom: '1rem' 
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ 
                    background: 'white', 
                    padding: '2rem', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <div className="form-group">
                        <label htmlFor="code">Código del Producto *</label>
                        <input 
                            type="text" 
                            id="code" 
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required 
                            disabled={isEditing}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto *</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoría *</label>
                        <select 
                            id="category" 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio (CLP) *</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="100"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock Disponible</label>
                        <input 
                            type="number" 
                            id="stock" 
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción *</label>
                        <textarea 
                            id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">URL de la Imagen</label>
                        <input 
                            type="text" 
                            id="image" 
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="/img/producto.jpg"
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                            type="checkbox" 
                            id="featured" 
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            style={{ width: 'auto', marginRight: '0.5rem' }}
                        />
                        <label htmlFor="featured" style={{ margin: 0 }}>
                            Marcar como producto destacado
                        </label>
                    </div>

                    <button type="submit" className="btn-submit">
                        {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
