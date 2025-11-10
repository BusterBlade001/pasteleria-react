// Simulación de Base de Datos para Pastelería Mil Sabores
// Este archivo simula una base de datos en memoria con funciones CRUD

// Datos iniciales de productos
let products = [
    { id: 1, code: "TC001", category: "Tortas Cuadradas", name: "Torta Cuadrada de Chocolate", price: 45000, description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", image: "/torta-cuadrada-de-chocolate.jpg", stock: 10, featured: true },
    { id: 2, code: "TC002", category: "Tortas Cuadradas", name: "Torta Cuadrada de Frutas", price: 50000, description: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", image: "/torta-cuadrada-de-frutas.jpg", stock: 8, featured: false },
    { id: 3, code: "TT001", category: "Tortas Circulares", name: "Torta Circular de Vainilla", price: 40000, description: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", image: "/torta-circular-de-vainilla.jpg", stock: 12, featured: true },
    { id: 4, code: "TT002", category: "Tortas Circulares", name: "Torta Circular de Manjar", price: 42000, description: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.", image: "/torta-circular-de-manjar.jpg", stock: 15, featured: false },
    { id: 5, code: "PI001", category: "Postres Individuales", name: "Mousse de Chocolate", price: 5000, description: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.", image: "/mousse-de-chocolate.jpg", stock: 25, featured: false },
    { id: 6, code: "PI002", category: "Postres Individuales", name: "Tiramisú Clásico", price: 5500, description: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.", image: "/tiramisu-clasico.jpg", stock: 20, featured: true },
    { id: 7, code: "PSA001", category: "Productos Sin Azúcar", name: "Torta Sin Azúcar de Naranja", price: 48000, description: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.", image: "/torta-sin-azucar-naranja.jpg", stock: 6, featured: false },
    { id: 8, code: "PSA002", category: "Productos Sin Azúcar", name: "Cheesecake Sin Azúcar", price: 47000, description: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", image: "/Cheesecake--sin-azucar.jpg", stock: 7, featured: true },
    { id: 9, code: "PT001", category: "Pastelería Tradicional", name: "Empanada de Manzana", price: 3000, description: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.", image: "/empanada-de-manzana.jpg", stock: 30, featured: false },
    { id: 10, code: "PT002", category: "Pastelería Tradicional", name: "Tarta de Santiago", price: 6000, description: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.", image: "/tarta-de-santiago.jpg", stock: 18, featured: false },
    { id: 11, code: "PG001", category: "Productos Sin Gluten", name: "Brownie Sin Gluten", price: 4000, description: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.", image: "/brownie-sin-gluten.jpg", stock: 22, featured: false },
    { id: 12, code: "PG002", category: "Productos Sin Gluten", name: "Pan Sin Gluten", price: 3500, description: "Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida.", image: "/pan-sin-gluten.jpg", stock: 28, featured: false },
    { id: 13, code: "PV001", category: "Productos Vegana", name: "Torta Vegana de Chocolate", price: 50000, description: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.", image: "/torta-vegana-de-chocolate.jpg", stock: 9, featured: true },
    { id: 14, code: "PV002", category: "Productos Vegana", name: "Galletas Veganas de Avena", price: 4500, description: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.", image: "/galletas-veganas-de-avena.jpg", stock: 35, featured: false },
    { id: 15, code: "TE001", category: "Tortas Especiales", name: "Torta Especial de Cumpleaños", price: 55000, description: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", image: "/torta-especial-de-cumpleaños.jpg", stock: 5, featured: true },
    { id: 16, code: "TE002", category: "Tortas Especiales", name: "Torta Especial de Boda", price: 60000, description: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.", image: "/torta-especial-de-boda.jpg", stock: 3, featured: true }
];

// Datos iniciales de usuarios
let users = [
    { id: 1, name: "Administrador", email: "admin@pasteleria.cl", password: "admin123", role: "admin", createdAt: new Date().toISOString() },
    { id: 2, name: "Juan Pérez", email: "juan@example.com", password: "123456", role: "customer", createdAt: new Date().toISOString() }
];

// Datos iniciales de órdenes
let orders = [
    { 
        id: 1, 
        trackingNumber: "PS-12345678", 
        userId: 2, 
        userName: "Juan Pérez",
        userEmail: "juan@example.com",
        date: new Date().toLocaleDateString('es-CL'), 
        deliveryDate: "2025-11-15", 
        status: "Preparación", 
        items: [
            { code: "TC001", name: "Torta Cuadrada de Chocolate", price: 45000, quantity: 1 }
        ],
        total: 45000
    }
];

// Guardamos una copia profunda del estado inicial (CLAVE para los tests)
const INITIAL_PRODUCTS_COPY = JSON.parse(JSON.stringify(products));
const INITIAL_USERS_COPY = JSON.parse(JSON.stringify(users));
const INITIAL_ORDERS_COPY = JSON.parse(JSON.stringify(orders));


// Categorías disponibles
const categories = [
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azúcar",
    "Pastelería Tradicional",
    "Productos Sin Gluten",
    "Productos Vegana",
    "Tortas Especiales"
];

// Contadores para IDs autoincrementales
let nextProductId = products.length + 1;
let nextUserId = users.length + 1;
let nextOrderId = orders.length + 1;

// ==================== FUNCIÓN DE RESETEO (NUEVA) ====================

export const resetDatabase = () => {
    products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS_COPY));
    users = JSON.parse(JSON.stringify(INITIAL_USERS_COPY));
    orders = JSON.parse(JSON.stringify(INITIAL_ORDERS_COPY));
    nextProductId = INITIAL_PRODUCTS_COPY.length + 1;
    nextUserId = INITIAL_USERS_COPY.length + 1;
    nextOrderId = INITIAL_ORDERS_COPY.length + 1;
};

// ==================== FUNCIONES CRUD PARA PRODUCTOS ====================

export const getAllProducts = () => {
    return [...products];
};

export const getProductById = (id) => {
    const product = products.find(p => p.id === parseInt(id));
    // Si no lo encuentra, find() devuelve 'undefined'.
    return product; 
};

export const getProductByCode = (code) => {
    return products.find(p => p.code === code);
};

export const getFeaturedProducts = () => {
    return products.filter(p => p.featured);
};

export const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
};

export const createProduct = (productData) => {
    const newProduct = {
        id: nextProductId++,
        ...productData,
        code: productData.code || `PROD${nextProductId}`,
        stock: productData.stock || 0,
        featured: productData.featured || false
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (id, updatedData) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        return products[index];
    }
    return null;
};

export const deleteProduct = (id) => {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        const deleted = products.splice(index, 1);
        return deleted[0]; // Devuelve el objeto eliminado (truthy)
    }
    return null;
};

export const searchProducts = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
};

// ==================== FUNCIONES CRUD PARA USUARIOS ====================

export const getAllUsers = () => {
    return users.map(u => ({ ...u, password: undefined })); // No devolver passwords
};

export const getUserById = (id) => {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};

export const getUserByEmail = (email) => {
    return users.find(u => u.email === email);
};

export const createUser = (userData) => {
    // Verificar si el email ya existe
    if (getUserByEmail(userData.email)) {
        throw new Error("El email ya está registrado");
    }
    
    const newUser = {
        id: nextUserId++,
        ...userData,
        role: userData.role || "customer",
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

export const updateUser = (id, updatedData) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedData };
        const { password, ...userWithoutPassword } = users[index];
        return userWithoutPassword;
    }
    return null;
};

export const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        const deleted = users.splice(index, 1);
        const { password, ...userWithoutPassword } = deleted[0];
        return userWithoutPassword;
    }
    return null;
};

export const authenticateUser = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};

// ==================== FUNCIONES CRUD PARA ÓRDENES ====================

export const getAllOrders = () => {
    return [...orders];
};

export const getOrderById = (id) => {
    return orders.find(o => o.id === parseInt(id));
};

export const getOrderByTrackingNumber = (trackingNumber) => {
    return orders.find(o => o.trackingNumber === trackingNumber);
};

export const getOrdersByUserId = (userId) => {
    return orders.filter(o => o.userId === parseInt(userId));
};

export const createOrder = (orderData) => {
    const trackingNumber = `PS-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const newOrder = {
        id: nextOrderId++,
        trackingNumber,
        ...orderData,
        date: new Date().toLocaleDateString('es-CL'),
        status: orderData.status || "Preparación"
    };
    orders.push(newOrder);
    return newOrder;
};

export const updateOrder = (id, updatedData) => {
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index !== -1) {
        orders[index] = { ...orders[index], ...updatedData };
        return orders[index];
    }
    return null;
};

export const updateOrderStatus = (id, newStatus) => {
    return updateOrder(id, { status: newStatus });
};

export const deleteOrder = (id) => {
    const index = orders.findIndex(o => o.id === parseInt(id));
    if (index !== -1) {
        const deleted = orders.splice(index, 1);
        return deleted[0];
    }
    return null;
};

// ==================== FUNCIONES AUXILIARES ====================

export const getCategories = () => {
    return [...categories];
};

export const getOrderStatuses = () => {
    return ["Preparación", "En Camino", "Entregado", "Cancelado"];
};

// Estadísticas para el dashboard
export const getStatistics = () => {
    return {
        totalProducts: products.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
        lowStockProducts: products.filter(p => p.stock < 5).length,
        pendingOrders: orders.filter(o => o.status === "Preparación").length
    };
};