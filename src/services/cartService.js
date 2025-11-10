// Servicio de Carrito de Compras
const CART_KEY = 'pasteleria_cart';

// Obtener carrito actual
export const getCart = () => {
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : [];
};

// Guardar carrito
const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Agregar producto al carrito
export const addToCart = (product, quantity = 1, personalization = '') => {
    const cart = getCart();
    
    // Buscar si el producto ya existe con la misma personalización
    const existingItemIndex = cart.findIndex(
        item => item.code === product.code && item.personalization === personalization
    );
    
    if (existingItemIndex !== -1) {
        // Si existe, aumentar cantidad
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Si no existe, agregar nuevo item
        cart.push({
            id: product.id,
            code: product.code,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            personalization
        });
    }
    
    saveCart(cart);
    return cart;
};

// Actualizar cantidad de un producto
export const updateCartItemQuantity = (code, personalization, newQuantity) => {
    const cart = getCart();
    const itemIndex = cart.findIndex(
        item => item.code === code && item.personalization === personalization
    );
    
    if (itemIndex !== -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart(cart);
    }
    
    return cart;
};

// Eliminar producto del carrito
export const removeFromCart = (code, personalization = '') => {
    let cart = getCart();
    cart = cart.filter(
        item => !(item.code === code && item.personalization === personalization)
    );
    saveCart(cart);
    return cart;
};

// Limpiar carrito
export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    return [];
};

// Obtener total del carrito
export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Obtener cantidad total de items
export const getCartItemCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
};


