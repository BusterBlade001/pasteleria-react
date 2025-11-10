_**Nota:** Este documento ha sido generado automáticamente por Manus AI para reflejar la migración del proyecto a React y el cumplimiento de los requisitos de la Evaluación Parcial 2._

# Especificación de Requisitos de Software (ERS)

## Proyecto: Pastelería Mil Sabores (Versión React)

- **Versión del Documento:** 2.0
- **Fecha:** 09 de Noviembre, 2025
- **Autor:** Manus AI (en nombre del estudiante)

---

### 1. Introducción

#### 1.1. Propósito

El propósito de este documento es definir los requisitos funcionales y no funcionales para la versión 2.0 del sitio web de la "Pastelería Mil Sabores". Esta nueva versión migra la aplicación de un conjunto de páginas HTML estáticas a una **Single Page Application (SPA)** moderna, desarrollada con la librería **React**. El objetivo es mejorar la interactividad, mantenibilidad, y escalabilidad del sitio, además de implementar un sistema robusto de pruebas unitarias.

#### 1.2. Alcance

El sistema permitirá a los usuarios públicos explorar el catálogo de productos, ver detalles, gestionar un carrito de compras y simular un proceso de checkout. Adicionalmente, se incluye un panel de administración protegido que permite al personal autorizado gestionar productos, pedidos y usuarios. La persistencia de datos se simula a través de un módulo de JavaScript que actúa como base de datos en memoria.

#### 1.3. Glosario

| Término | Definición |
| :--- | :--- |
| **SPA** | Single Page Application. Aplicación web que carga una única página HTML y actualiza su contenido dinámicamente. |
| **React** | Librería de JavaScript para construir interfaces de usuario. |
| **Componente** | Bloque de construcción de UI, reutilizable e independiente. |
| **CRUD** | Acrónimo para las operaciones básicas de datos: Crear, Leer, Actualizar, Eliminar (Create, Read, Update, Delete). |
| **Jasmine** | Framework de pruebas de JavaScript para BDD (Behavior-Driven Development). |
| **Karma** | Herramienta para ejecutar pruebas de JavaScript en múltiples navegadores reales. |
| **Bootstrap** | Framework de CSS para diseño responsivo y componentes de UI. |

---

### 2. Requisitos Funcionales

#### 2.1. Módulo Público

| ID | Requisito | Descripción |
| :--- | :--- | :--- |
| **RF-001** | Visualizar Catálogo de Productos | El usuario debe poder ver una grilla con todos los productos disponibles. |
| **RF-002** | Filtrar Productos | El usuario debe poder filtrar los productos por categoría y buscar por texto. |
| **RF-003** | Ver Detalle de Producto | Al hacer clic en un producto, el usuario debe ser redirigido a una vista con su descripción, precio, stock y foto. |
| **RF-004** | Agregar Productos al Carrito | El usuario debe poder agregar productos al carrito desde la vista de detalle, especificando cantidad y personalización (si aplica). |
| **RF-005** | Visualizar Carrito de Compras | El usuario debe poder abrir un modal para ver los productos en su carrito, el total y la opción de eliminar ítems. |
| **RF-006** | Realizar Checkout | El usuario debe poder finalizar la compra, seleccionando una fecha de entrega. El sistema generará un número de seguimiento. |
| **RF-007** | Ver Página de Éxito | Tras una compra exitosa, el usuario verá una página de confirmación con los detalles del pedido. |
| **RF-008** | Rastrear Pedido | El usuario debe poder ingresar un número de seguimiento para ver el estado actual de su pedido. |
| **RF-009** | Autenticación de Usuarios | El sistema debe permitir a los usuarios registrarse e iniciar sesión. |
| **RF-010** | Ver Perfil de Usuario | Un usuario autenticado debe poder ver su información y el historial de sus pedidos. |
| **RF-011** | Navegar por Categorías | El usuario debe poder ver una página con todas las categorías y navegar a una vista con los productos de una categoría específica. |
| **RF-012** | Ver Ofertas | El usuario debe poder acceder a una página que muestre solo los productos marcados como "destacados". |

#### 2.2. Módulo de Administración (Protegido)

| ID | Requisito | Descripción |
| :--- | :--- | :--- |
| **RF-ADM-001** | Acceso Restringido | Solo los usuarios con rol "admin" pueden acceder al panel de administración. |
| **RF-ADM-002** | Ver Dashboard de Estadísticas | El administrador debe ver un panel con métricas clave (total de productos, pedidos, usuarios, ingresos, etc.). |
| **RF-ADM-003** | Gestionar Productos (CRUD) | El administrador debe poder crear, ver, editar y eliminar productos del catálogo. |
| **RF-ADM-004** | Gestionar Pedidos | El administrador debe poder ver todos los pedidos y actualizar su estado (ej. "Preparación" -> "En Camino"). |
| **RF-ADM-005** | Gestionar Usuarios | El administrador debe poder ver la lista de todos los usuarios registrados y eliminar cuentas (excepto la suya). |

---

### 3. Requisitos No Funcionales

| ID | Requisito | Descripción |
| :--- | :--- | :--- |
| **RNF-001** | **Rendimiento** | La aplicación debe cargar en menos de 3 segundos en una conexión de banda ancha estándar. Las transiciones entre vistas deben ser fluidas. |
| **RNF-002** | **Usabilidad** | La interfaz debe ser intuitiva y fácil de usar. El diseño debe ser consistente en toda la aplicación. |
| **RNF-003** | **Diseño Responsivo** | La aplicación debe ser completamente funcional y visualmente atractiva en dispositivos móviles, tabletas y computadoras de escritorio. |
| **RNF-004** | **Mantenibilidad** | El código debe estar estructurado en componentes reutilizables y seguir las mejores prácticas de React para facilitar futuras modificaciones. |
| **RNF-005** | **Pruebas** | El código debe tener una cobertura de pruebas unitarias superior al 70% para los componentes y lógica de negocio principal. |
| **RNF-006** | **Compatibilidad** | La aplicación debe ser compatible con las últimas dos versiones de los navegadores Chrome, Firefox y Safari. |
| **RNF-007** | **Seguridad** | Las rutas de administración deben estar protegidas contra el acceso no autorizado. |

---

### 4. Arquitectura y Diseño

#### 4.1. Arquitectura General

La aplicación sigue una arquitectura de **componentes** basada en React. La estructura del proyecto separa la lógica de negocio, los componentes de UI, las páginas y los servicios.

- **`src/components`**: Contiene componentes de UI reutilizables (Header, Footer, ProductCard, etc.).
- **`src/pages`**: Contiene los componentes que representan páginas completas (Home, ProductDetail, AdminDashboard, etc.).
- **`src/data`**: Contiene el archivo `database.js` que simula la base de datos y exporta las funciones CRUD.
- **`src/services`**: Contiene lógica de negocio desacoplada, como `authService.js` y `cartService.js`.
- **`src/App.js`**: Define el enrutamiento principal de la aplicación usando `react-router-dom`.

#### 4.2. Simulación de Base de Datos

La persistencia de datos se maneja a través de un archivo `database.js`. Este archivo exporta funciones para realizar operaciones CRUD sobre arreglos de objetos que representan productos, usuarios y pedidos. Esta simulación permite un desarrollo rápido y desacoplado del backend.

#### 4.3. Gestión de Estado

- **Estado Local:** Se utiliza el hook `useState` de React para gestionar el estado local de los componentes (ej. campos de un formulario).
- **Estado Global Simulado:** El estado del carrito y la sesión de usuario se gestionan a través de `localStorage` y servicios dedicados (`cartService`, `authService`), permitiendo que la información persista entre sesiones y sea accesible desde cualquier componente.

#### 4.4. Enrutamiento

Se utiliza la librería `react-router-dom` para gestionar la navegación en la SPA. Se definen rutas para cada página pública y para las vistas del panel de administración. Las rutas de administrador están protegidas por un componente `AdminRoute` que verifica los permisos del usuario.

#### 4.5. Pruebas

El entorno de pruebas se configura con **Karma** como ejecutor de pruebas y **Jasmine** como el framework de aserción. Las pruebas se centran en:

- **Renderizado de componentes:** Verificar que los componentes se rendericen correctamente con sus `props`.
- **Interacción del usuario:** Simular eventos (clics, cambios en formularios) y verificar que el estado del componente se actualice como se espera.
- **Lógica de servicios:** Probar las funciones de los servicios (`database.js`, `authService.js`, `cartService.js`) para asegurar que la lógica de negocio sea correcta.
