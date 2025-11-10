import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, completa todos los campos');
            return;
        }

        const result = login(email, password);
        
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
                <h1>Iniciar Sesión</h1>
                
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
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn-submit">Iniciar Sesión</button>
                </form>
                
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
                
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                    <p><strong>Usuarios de prueba:</strong></p>
                    <p>Admin: admin@pasteleria.cl / admin123</p>
                    <p>Cliente: juan@example.com / 123456</p>
                </div>
            </div>
        </main>
    );
};

export default Login;
