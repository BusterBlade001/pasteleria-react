import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

// Páginas públicas
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryView from './pages/CategoryView';
import Offers from './pages/Offers';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';
import CheckoutSuccess from './pages/CheckoutSuccess';

// Páginas de administrador
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import ProductForm from './pages/admin/ProductForm';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categoria/:category" element={<CategoryView />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/seguimiento" element={<TrackOrder />} />
          <Route path="/seguimiento/:trackingNumber" element={<TrackOrder />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          
          {/* Rutas de administrador (protegidas) */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/productos" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/productos/nuevo" element={<AdminRoute><ProductForm /></AdminRoute>} />
          <Route path="/admin/productos/editar/:id" element={<AdminRoute><ProductForm /></AdminRoute>} />
          <Route path="/admin/pedidos" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/usuarios" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
