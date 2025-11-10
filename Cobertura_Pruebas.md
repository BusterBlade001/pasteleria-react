# Documento de Cobertura de Pruebas

## Proyecto: Pastelería Mil Sabores (Versión React)

- **Versión del Documento:** 1.0
- **Fecha:** 09 de Noviembre, 2025
- **Autor:** Manus AI (en nombre del estudiante)

---

### 1. Introducción

Este documento detalla la estrategia y cobertura de las pruebas unitarias implementadas para el proyecto "Pastelería Mil Sabores". Las pruebas son un requisito fundamental de la evaluación para garantizar la calidad, correctitud y robustez del código desarrollado.

El entorno de pruebas utilizado se compone de:

- **Karma:** Como ejecutor de pruebas (test runner), encargado de lanzar un navegador y ejecutar las pruebas en un entorno real.
- **Jasmine:** Como framework de pruebas BDD (Behavior-Driven Development), que proporciona una sintaxis clara para definir y organizar los casos de prueba.
- **React Testing Library:** Para renderizar componentes en un entorno de prueba y simular interacciones del usuario de una manera que se asemeja a cómo el usuario final interactúa con la aplicación.

### 2. Cobertura de Pruebas por Módulo

A continuación, se desglosa la cobertura de pruebas para los componentes y servicios más críticos de la aplicación.

#### 2.1. Pruebas de Componentes de UI (`/src/components`)

| Componente | Casos de Prueba Implementados | Justificación |
| :--- | :--- | :--- |
| **`ProductCard.js`** | - Renderiza el nombre, descripción y precio del producto.<br>- Formatea el precio correctamente en formato CLP.<br>- Muestra la imagen con el `alt` text correcto.<br>- Muestra una advertencia de "stock bajo" si corresponde.<br>- Muestra un mensaje de "Agotado" si el stock es cero.<br>- El enlace apunta correctamente a la página de detalle del producto. | Es un componente visual clave y reutilizado en toda la aplicación. Es crucial que muestre la información del producto de manera fiable. |
| **`ProductFilters.js`** | - Renderiza el campo de búsqueda y el selector de categorías.<br>- Invoca la función `onSearchChange` cuando el usuario escribe en el campo de búsqueda.<br>- Invoca la función `onCategoryChange` cuando el usuario selecciona una nueva categoría.<br>- Muestra correctamente el término de búsqueda y la categoría seleccionada actualmente. | La funcionalidad de filtrado es central para la experiencia del usuario en el catálogo. Las pruebas aseguran que la interacción del usuario se propaga correctamente al componente padre. |

#### 2.2. Pruebas de Servicios (`/src/services`)

| Servicio | Casos de Prueba Implementados | Justificación |
| :--- | :--- | :--- |
| **`authService.js`** | - `login`: Autentica con credenciales válidas e inválidas.<br>- `register`: Registra un nuevo usuario y previene registros con email duplicado.<br>- `logout`: Limpia los datos de sesión del `localStorage`.<br>- `isAuthenticated` y `isAdmin`: Devuelven el estado de autenticación y rol correctos.<br>- `getCurrentUser`: Retorna el usuario actual o `null`. | La gestión de la sesión es una parte crítica y sensible de la aplicación. Las pruebas garantizan que el flujo de autenticación y la gestión de roles funcionen como se espera. |
| **`cartService.js`** | - `addToCart`: Agrega productos, incrementa la cantidad si ya existe, y maneja personalizaciones.<br>- `removeFromCart`: Elimina productos del carrito.<br>- `updateCartItemQuantity`: Actualiza la cantidad o elimina el ítem si la cantidad es cero.<br>- `clearCart`: Vacía completamente el carrito.<br>- `getCartTotal` y `getCartItemCount`: Calculan el total y la cantidad de ítems correctamente. | El carrito de compras es el núcleo de la funcionalidad de e-commerce. Las pruebas aseguran que todos los cálculos y manipulaciones del estado del carrito sean precisos. |

#### 2.3. Pruebas de Lógica de Datos (`/src/data`)

| Módulo | Casos de Prueba Implementados | Justificación |
| :--- | :--- | :--- |
| **`database.js`** | - **Productos:** `getAll`, `getById`, `create`, `update`, `delete`, `search`.<br>- **Usuarios:** `getAll`, `create`, `authenticate`, prevención de duplicados.<br>- **Pedidos:** `getAll`, `create`, `updateOrderStatus`.<br>- **Estadísticas:** `getStatistics` retorna un objeto con todas las métricas. | Este archivo simula el backend y contiene toda la lógica de negocio principal. Probar estas funciones de manera exhaustiva asegura que la "fuente de la verdad" de la aplicación es consistente y fiable. |

### 3. Ejecución de Pruebas

Para ejecutar el conjunto de pruebas, se ha añadido un nuevo script al archivo `package.json`:

```json
"scripts": {
  "test:karma": "karma start --single-run"
}
```

Para correr las pruebas, se debe ejecutar el siguiente comando en la terminal, dentro del directorio del proyecto React:

```bash
npm run test:karma
```

Este comando iniciará Karma, abrirá un navegador `ChromeHeadless` (sin interfaz gráfica), ejecutará todas las pruebas encontradas (`*.test.js` y `*.spec.js`) y mostrará los resultados en la consola. El flag `--single-run` asegura que el proceso termine después de ejecutar las pruebas, lo cual es ideal para integración continua.

### 4. Conclusión

La estrategia de pruebas implementada cubre las áreas más críticas de la aplicación, incluyendo la lógica de negocio, la gestión de estado y la renderización de componentes clave. Esto proporciona una base sólida de confianza en el código y facilita el mantenimiento y la adición de nuevas funcionalidades en el futuro, cumpliendo con los requisitos de la evaluación.
