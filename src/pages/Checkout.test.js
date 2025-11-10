import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Mantenemos la importación para que Jest resuelva el archivo (aunque usará el mock)
import { BrowserRouter } from 'react-router-dom'; 
import Checkout from './Checkout';

// ------------------------------------
// Mocks de Módulos
// ------------------------------------

// --- Mock para silenciar JSDOM/Alert ---
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
// ----------------------------------------

// Mockeamos la navegación (debe estar definida afuera)
const mockNavigate = jest.fn();

// Mocks de servicios (para controlar el estado de la aplicación)
const mockGetCurrentUser = jest.fn();
const mockGetCart = jest.fn();
const mockGetCartTotal = jest.fn();
const mockClearCart = jest.fn();
const mockCreateOrder = jest.fn();

// CORRECCIÓN CLAVE: Eliminamos jest.requireActual() y definimos todos los exports necesarios.
jest.mock('react-router-dom', () => ({
    // Controlamos el hook de navegación
    useNavigate: () => mockNavigate,
    // Definimos el hook de parámetros (necesario si se usa en la página)
    useParams: () => ({}),
    // Mockeamos componentes para que los tests puedan renderizar la página
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ children, to }) => <a href={to}>{children}</a>, 
    Navigate: () => null, 
}));

// Mocking Service dependencies
jest.mock('../services/authService', () => ({
    getCurrentUser: () => mockGetCurrentUser(),
}));

jest.mock('../services/cartService', () => ({
    getCart: () => mockGetCart(),
    getCartTotal: () => mockGetCartTotal(),
    clearCart: () => mockClearCart(),
}));

jest.mock('../data/database', () => ({
    createOrder: (orderData) => mockCreateOrder(orderData),
}));

// ------------------------------------
// Setup de Tests
// ------------------------------------

describe('Checkout Page', () => {
    beforeEach(() => {
        // Estado por defecto: Usuario logueado, carrito con total simple (No falla)
        mockGetCurrentUser.mockReturnValue({ 
            id: 1, 
            name: 'Juan Pérez', 
            email: 'juan@example.com' 
        });
        mockGetCart.mockReturnValue([{ code: 'TC001', price: 10000, quantity: 1 }]);
        mockGetCartTotal.mockReturnValue(10000);
        mockCreateOrder.mockReturnValue({ trackingNumber: 'PS-MOCK123' });
        mockNavigate.mockClear();

        // Mockear localStorage para la función de crear orden
        // Jest ya mockea localStorage por defecto, pero esto asegura que setItem funcione
        global.localStorage.setItem = jest.fn();
    });

    it('should navigate to home if cart is empty', () => {
        mockGetCart.mockReturnValue([]);
        render(<BrowserRouter><Checkout /></BrowserRouter>);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should pre-fill Name and Email fields if user is logged in', () => {
        render(<BrowserRouter><Checkout /></BrowserRouter>);
        
        expect(screen.getByLabelText('Nombre Completo *').value).toBe('Juan Pérez');
        expect(screen.getByLabelText('Correo Electrónico *').value).toBe('juan@example.com');
    });

    it('should navigate to /checkout-success on successful submission', () => {
        // Renderizar
        render(<BrowserRouter><Checkout /></BrowserRouter>);

        // Simular campos obligatorios
        fireEvent.change(screen.getByLabelText('Fecha de Entrega Preferida *'), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText('Calle y Número *'), { target: { value: 'Av. Test 123' } });

        // Simular envío
        fireEvent.click(screen.getByText(/Pagar ahora/));

        // Aserciones de éxito
        expect(mockCreateOrder).toHaveBeenCalled();
        expect(mockClearCart).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/checkout-success');
    });

    it('should navigate to /checkout-failure when payment simulation fails (Total > 80000 and even)', () => {
        // Forzar la condición de fallo
        mockGetCartTotal.mockReturnValue(80002); 

        render(<BrowserRouter><Checkout /></BrowserRouter>);

        // Simular campos obligatorios
        fireEvent.change(screen.getByLabelText('Fecha de Entrega Preferida *'), { target: { value: '2025-12-31' } });
        fireEvent.change(screen.getByLabelText('Calle y Número *'), { target: { value: 'Av. Test 123' } });

        // Simular envío
        fireEvent.click(screen.getByText(/Pagar ahora/));

        // Aserciones de fallo
        expect(mockNavigate).toHaveBeenCalledWith('/checkout-failure');
        expect(mockCreateOrder).not.toHaveBeenCalled();
    });

    it('should show error if required fields are missing', () => {
        // No completamos Address o Date
        render(<BrowserRouter><Checkout /></BrowserRouter>);
        fireEvent.click(screen.getByText(/Pagar ahora/));

        // Buscar mensaje de error en pantalla
        expect(screen.getByText(/Por favor, completa todos los campos obligatorios/)).toBeTruthy();
        expect(mockCreateOrder).not.toHaveBeenCalled();
    });
});