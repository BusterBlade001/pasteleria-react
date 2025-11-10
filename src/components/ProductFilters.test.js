import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductFilters from './ProductFilters';

describe('ProductFilters Component', () => {
    const mockOnSearchChange = jasmine.createSpy('onSearchChange');
    const mockOnCategoryChange = jasmine.createSpy('onCategoryChange');

    beforeEach(() => {
        mockOnSearchChange.calls.reset();
        mockOnCategoryChange.calls.reset();
    });

    it('should render search input', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const searchInput = screen.getByPlaceholderText('Buscar por nombre...');
        expect(searchInput).toBeTruthy();
    });

    it('should render category select', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const categorySelect = screen.getByDisplayValue('Todas las Categorías');
        expect(categorySelect).toBeTruthy();
    });

    it('should call onSearchChange when typing in search input', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const searchInput = screen.getByPlaceholderText('Buscar por nombre...');
        fireEvent.change(searchInput, { target: { value: 'chocolate' } });
        expect(mockOnSearchChange).toHaveBeenCalledWith('chocolate');
    });

    it('should call onCategoryChange when selecting a category', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const categorySelect = screen.getByRole('combobox');
        fireEvent.change(categorySelect, { target: { value: 'Tortas Cuadradas' } });
        expect(mockOnCategoryChange).toHaveBeenCalledWith('Tortas Cuadradas');
    });

    it('should display current search term', () => {
        render(
            <ProductFilters 
                searchTerm="chocolate"
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const searchInput = screen.getByPlaceholderText('Buscar por nombre...');
        expect(searchInput.value).toBe('chocolate');
    });

    it('should display selected category', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory="Tortas Circulares"
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const categorySelect = screen.getByRole('combobox');
        expect(categorySelect.value).toBe('Tortas Circulares');
    });

    it('should render all category options', () => {
        render(
            <ProductFilters 
                searchTerm=""
                onSearchChange={mockOnSearchChange}
                selectedCategory=""
                onCategoryChange={mockOnCategoryChange}
            />
        );
        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(1); // At least "Todas las Categorías" + categories
    });
});
