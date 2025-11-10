import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Por favor, completa todos los campos');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const result = register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
        
        if (result.success) {
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <main className="container" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
            <div className="auth-container">
                <h1>Crear Cuenta</h1>
                
                {error && (
                    <div className="error-message" style={{ 
                        background: '#ffebee', 
                        color: '#c62828', 
                        padding: '1rem', 
                        borderRadius: '4px', 
                        marginBottom: '1rem' 
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre Completo:</label>
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
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            minLength="6"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn-submit">Registrarse</button>
                </form>
                
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
