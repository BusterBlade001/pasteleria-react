import {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
} from './cartService';

describe('CartService', () => {
    const mockProduct = {
        id: 1,
        code: 'TC001',
        name: 'Torta de Chocolate',
        price: 45000,
        image: '/img/torta.jpg'
    };

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    describe('getCart', () => {
        it('should return empty array when cart is empty', () => {
            const cart = getCart();
            expect(cart).toEqual([]);
        });

        it('should return cart items when cart has products', () => {
            addToCart(mockProduct, 1);
            const cart = getCart();
            expect(cart.length).toBe(1);
            expect(cart[0].name).toBe('Torta de Chocolate');
        });
    });

    describe('addToCart', () => {
        it('should add product to empty cart', () => {
            const cart = addToCart(mockProduct, 1);
            expect(cart.length).toBe(1);
            expect(cart[0].code).toBe('TC001');
            expect(cart[0].quantity).toBe(1);
        });

        it('should add product with personalization', () => {
            const cart = addToCart(mockProduct, 1, 'Feliz Cumpleaños');
            expect(cart[0].personalization).toBe('Feliz Cumpleaños');
        });

        it('should increase quantity if same product added again', () => {
            addToCart(mockProduct, 1);
            const cart = addToCart(mockProduct, 2);
            expect(cart.length).toBe(1);
            expect(cart[0].quantity).toBe(3);
        });

        it('should add as separate item if personalization is different', () => {
            addToCart(mockProduct, 1, 'Mensaje 1');
            const cart = addToCart(mockProduct, 1, 'Mensaje 2');
            expect(cart.length).toBe(2);
        });
    });

    describe('updateCartItemQuantity', () => {
        it('should update quantity of existing item', () => {
            addToCart(mockProduct, 1);
            const cart = updateCartItemQuantity('TC001', '', 5);
            expect(cart[0].quantity).toBe(5);
        });

        it('should remove item if quantity is set to 0', () => {
            addToCart(mockProduct, 1);
            const cart = updateCartItemQuantity('TC001', '', 0);
            expect(cart.length).toBe(0);
        });

        it('should handle items with personalization', () => {
            addToCart(mockProduct, 1, 'Mensaje');
            const cart = updateCartItemQuantity('TC001', 'Mensaje', 3);
            expect(cart[0].quantity).toBe(3);
        });
    });

    describe('removeFromCart', () => {
        it('should remove item from cart', () => {
            addToCart(mockProduct, 1);
            const cart = removeFromCart('TC001');
            expect(cart.length).toBe(0);
        });

        it('should only remove item with matching personalization', () => {
            addToCart(mockProduct, 1, 'Mensaje 1');
            addToCart(mockProduct, 1, 'Mensaje 2');
            const cart = removeFromCart('TC001', 'Mensaje 1');
            expect(cart.length).toBe(1);
            expect(cart[0].personalization).toBe('Mensaje 2');
        });
    });

    describe('clearCart', () => {
        it('should remove all items from cart', () => {
            addToCart(mockProduct, 1);
            addToCart({ ...mockProduct, code: 'TC002' }, 2);
            const cart = clearCart();
            expect(cart.length).toBe(0);
        });
    });

    describe('getCartTotal', () => {
        it('should return 0 for empty cart', () => {
            const total = getCartTotal();
            expect(total).toBe(0);
        });

        it('should calculate total correctly', () => {
            addToCart(mockProduct, 2); // 45000 * 2 = 90000
            const total = getCartTotal();
            expect(total).toBe(90000);
        });

        it('should calculate total for multiple products', () => {
            addToCart(mockProduct, 1); // 45000
            addToCart({ ...mockProduct, code: 'TC002', price: 50000 }, 2); // 100000
            const total = getCartTotal();
            expect(total).toBe(145000);
        });
    });

    describe('getCartItemCount', () => {
        it('should return 0 for empty cart', () => {
            const count = getCartItemCount();
            expect(count).toBe(0);
        });

        it('should count total items correctly', () => {
            addToCart(mockProduct, 2);
            const count = getCartItemCount();
            expect(count).toBe(2);
        });

        it('should sum quantities across multiple products', () => {
            addToCart(mockProduct, 2);
            addToCart({ ...mockProduct, code: 'TC002' }, 3);
            const count = getCartItemCount();
            expect(count).toBe(5);
        });
    });
});
