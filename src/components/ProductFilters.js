import React from 'react';
import { getCategories } from '../data/database';
import PropTypes from 'prop-types';

const ProductFilters = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
    const categories = getCategories();

    return (
        <div className="filters">
            <input 
                type="text" 
                id="search-input" 
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select 
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Todas las Categorías</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

ProductFilters.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default ProductFilters;
