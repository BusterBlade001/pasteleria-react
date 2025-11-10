import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../services/authService';

const AdminRoute = ({ children }) => {
    if (!isAdmin()) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default AdminRoute;
