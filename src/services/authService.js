// Servicio de Autenticación
import { authenticateUser, createUser } from '../data/database';

const AUTH_KEY = 'pasteleria_auth';
const USER_KEY = 'pasteleria_user';

// Obtener usuario actual desde localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
};

// Verificar si hay sesión activa
export const isAuthenticated = () => {
    return localStorage.getItem(AUTH_KEY) === 'true' && getCurrentUser() !== null;
};

// Verificar si el usuario actual es administrador
export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

// Iniciar sesión
export const login = (email, password) => {
    const user = authenticateUser(email, password);
    if (user) {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Credenciales inválidas' };
};

// Registrar nuevo usuario
export const register = (userData) => {
    try {
        const newUser = createUser(userData);
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        return { success: true, user: newUser };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Cerrar sesión
export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
};

// Actualizar datos del usuario en sesión
export const updateCurrentUser = (updatedData) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const updatedUser = { ...currentUser, ...updatedData };
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        return updatedUser;
    }
    return null;
};


