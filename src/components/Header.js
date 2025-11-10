import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, logout } from '../services/authService';
import { getCartItemCount } from '../services/cartService';
import CartModal from './CartModal';
import Logo from '../img/Logo.png';

const Header = () => {
    const [showCart, setShowCart] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [authenticated, setAuthenticated] = useState(false);
    const [adminUser, setAdminUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        updateAuthStatus();
        updateCartCount();
        
        // Escuchar cambios en el carrito
        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('storage', updateAuthStatus);
        
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('storage', updateAuthStatus);
        };
    }, []);

    const updateAuthStatus = () => {
        setAuthenticated(isAuthenticated());
        setAdminUser(isAdmin());
    };

    const updateCartCount = () => {
        setCartCount(getCartItemCount());
    };

    const handleLogout = () => {
        logout();
        updateAuthStatus();
        navigate('/');
    };

    const handleCartClick = () => {
        setShowCart(true);
        updateCartCount();
    };

    return (
        <>
            <header className="header">
                <nav className="navbar left-nav">
                    <ul>
                        <li><Link to="/catalogo">Catálogo</Link></li>
                        <li><Link to="/categorias">Categorías</Link></li>
                        <li><Link to="/ofertas">Ofertas</Link></li>
                        <li><Link to="/nosotros">Nuestra Historia</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        {/* CORRECCIÓN: Se añade el enlace a la página de Contacto */}
                        <li><Link to="/contacto">Contacto</Link></li> 
                    </ul>
                </nav>

                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Pastelería Mil Sabores Logo" />
                    </Link>
                </div>
                
                <nav className="navbar right-nav">
                    <div className="search-and-icons">
                        <div className="user-icons">
                            {authenticated ? (
                                <>
                                    <Link to="/profile" className="icon-link icon-profile" title="Mi Perfil">
                                        👤
                                    </Link>
                                    <button 
                                        onClick={handleLogout} 
                                        className="icon-link icon-logout"
                                        title="Cerrar Sesión"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
                                    >
                                        🚪
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="icon-link icon-profile" title="Iniciar Sesión">
                                    👤
                                </Link>
                            )}

                            <button 
                                onClick={handleCartClick} 
                                className="icon-link icon-cart"
                                title="Carrito de Compras"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', position: 'relative' }}
                            >
                                🛒
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        background: '#e74c3c',
                                        color: 'white',
                                        borderRadius: '50%',
                                        padding: '2px 6px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            
                            {adminUser && (
                                <Link to="/admin" className="icon-link icon-admin" title="Panel de Administrador">
                                    🔒
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {showCart && <CartModal onClose={() => setShowCart(false)} onUpdate={updateCartCount} />}
        </>
    );
};

export default Header;