import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/producto/${product.id}`} className="product-card">
            <img src={require(`../img${product.image.startsWith("/") ? product.image : `/${product.image}`}`)} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toLocaleString('es-CL')} CLP</p>
            {product.stock < 5 && product.stock > 0 && (
                <p className="low-stock">¡Solo quedan {product.stock}!</p>
            )}
            {product.stock === 0 && (
                <p className="out-of-stock">Agotado</p>
            )}
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        stock: PropTypes.number,
        category: PropTypes.string.isRequired
    }).isRequired
};

export default ProductCard;
