import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
    const mockProduct = {
        id: 1,
        code: 'TC001',
        name: 'Torta de Chocolate',
        description: 'Deliciosa torta de chocolate',
        price: 45000,
        // CORRECCIÓN: Ruta de imagen válida de la base de datos original.
        image: '/torta-cuadrada-de-chocolate.jpg', 
        stock: 10,
        category: 'Tortas'
    };

    it('should render product name', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText('Torta de Chocolate')).toBeTruthy();
    });

    it('should render product description', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText('Deliciosa torta de chocolate')).toBeTruthy();
    });

    it('should render product price formatted', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText(/45\.000 CLP/)).toBeTruthy();
    });

    it('should render product image with correct alt text', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        const image = screen.getByAltText('Torta de Chocolate');
        expect(image).toBeTruthy();
        // Aserción corregida para usar el nombre del archivo.
        expect(image.src).toContain(mockProduct.image.substring(1)); 
    });

    it('should show low stock warning when stock is less than 5', () => {
        const lowStockProduct = { ...mockProduct, stock: 3 };
        render(
            <BrowserRouter>
                <ProductCard product={lowStockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText('¡Solo quedan 3!')).toBeTruthy();
    });

    it('should show out of stock message when stock is 0', () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };
        render(
            <BrowserRouter>
                <ProductCard product={outOfStockProduct} />
            </BrowserRouter>
        );
        expect(screen.getByText('Agotado')).toBeTruthy();
    });

    it('should have correct link to product detail page', () => {
        const { container } = render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );
        const link = container.querySelector('a');
        expect(link.href).toContain('/producto/1');
    });
});