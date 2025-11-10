// src/__mocks__/react-router-dom.js
import React from 'react';

// 1. Mock para BrowserRouter (el componente de nivel superior)
export const BrowserRouter = ({ children }) => <div>{children}</div>;

// 2. Mock para Link (el componente usado en ProductCard.js y otros)
export const Link = ({ children, to, className }) => <a href={to} className={className}>{children}</a>;

// 3. Mocks de Hooks (usados en componentes como Header, CategoryView, etc.)
export const useNavigate = jest.fn(() => jest.fn());
export const useParams = jest.fn(() => ({ id: '1', category: 'Test' }));
export const Navigate = ({ to }) => <div>Navigate to {to}</div>;