import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getAllUsers,
    createUser,
    authenticateUser,
    getAllOrders,
    createOrder,
    updateOrderStatus,
    getStatistics
} from './database';

describe('Database Service - Products', () => {
    it('should get all products', () => {
        const products = getAllProducts();
        expect(products).toBeTruthy();
        expect(products.length).toBeGreaterThan(0);
    });

    it('should get product by id', () => {
        const product = getProductById(1);
        expect(product).toBeTruthy();
        expect(product.id).toBe(1);
    });

    it('should return null for non-existent product id', () => {
        const product = getProductById(99999);
        expect(product).toBeUndefined();
    });

    it('should create a new product', () => {
        const newProduct = {
            code: 'TEST001',
            name: 'Producto de Prueba',
            category: 'Tortas Cuadradas',
            price: 30000,
            description: 'Descripción de prueba',
            image: '/img/test.jpg',
            stock: 5
        };
        const created = createProduct(newProduct);
        expect(created).toBeTruthy();
        expect(created.name).toBe('Producto de Prueba');
        expect(created.id).toBeTruthy();
    });

    it('should update an existing product', () => {
        const updated = updateProduct(1, { price: 50000 });
        expect(updated).toBeTruthy();
        expect(updated.price).toBe(50000);
    });

    it('should delete a product', () => {
        const initialCount = getAllProducts().length;
        const deleted = deleteProduct(1);
        expect(deleted).toBeTruthy();
        const newCount = getAllProducts().length;
        expect(newCount).toBe(initialCount - 1);
    });

    it('should search products by name', () => {
        const results = searchProducts('chocolate');
        expect(results).toBeTruthy();
        expect(results.length).toBeGreaterThan(0);
        expect(results[0].name.toLowerCase()).toContain('chocolate');
    });
});

describe('Database Service - Users', () => {
    it('should get all users', () => {
        const users = getAllUsers();
        expect(users).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should create a new user', () => {
        const newUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        };
        const created = createUser(newUser);
        expect(created).toBeTruthy();
        expect(created.name).toBe('Test User');
        expect(created.email).toBe('test@example.com');
        expect(created.password).toBeUndefined(); // Password should not be returned
    });

    it('should not create user with duplicate email', () => {
        expect(() => {
            createUser({
                name: 'Duplicate',
                email: 'admin@pasteleria.cl',
                password: 'test'
            });
        }).toThrow();
    });

    it('should authenticate user with correct credentials', () => {
        const user = authenticateUser('admin@pasteleria.cl', 'admin123');
        expect(user).toBeTruthy();
        expect(user.email).toBe('admin@pasteleria.cl');
        expect(user.password).toBeUndefined();
    });

    it('should not authenticate user with incorrect credentials', () => {
        const user = authenticateUser('admin@pasteleria.cl', 'wrongpassword');
        expect(user).toBeNull();
    });
});

describe('Database Service - Orders', () => {
    it('should get all orders', () => {
        const orders = getAllOrders();
        expect(orders).toBeTruthy();
        expect(Array.isArray(orders)).toBe(true);
    });

    it('should create a new order', () => {
        const newOrder = {
            userId: 1,
            userName: 'Test User',
            userEmail: 'test@example.com',
            deliveryDate: '2025-12-01',
            items: [
                { code: 'TC001', name: 'Torta', price: 45000, quantity: 1 }
            ],
            total: 45000
        };
        const created = createOrder(newOrder);
        expect(created).toBeTruthy();
        expect(created.trackingNumber).toBeTruthy();
        expect(created.trackingNumber).toContain('PS-');
        expect(created.status).toBe('Preparación');
    });

    it('should update order status', () => {
        const orders = getAllOrders();
        if (orders.length > 0) {
            const orderId = orders[0].id;
            const updated = updateOrderStatus(orderId, 'En Camino');
            expect(updated).toBeTruthy();
            expect(updated.status).toBe('En Camino');
        }
    });
});

describe('Database Service - Statistics', () => {
    it('should get statistics', () => {
        const stats = getStatistics();
        expect(stats).toBeTruthy();
        expect(stats.totalProducts).toBeGreaterThanOrEqual(0);
        expect(stats.totalUsers).toBeGreaterThanOrEqual(0);
        expect(stats.totalOrders).toBeGreaterThanOrEqual(0);
        expect(stats.totalRevenue).toBeGreaterThanOrEqual(0);
        expect(stats.lowStockProducts).toBeGreaterThanOrEqual(0);
        expect(stats.pendingOrders).toBeGreaterThanOrEqual(0);
    });
});
