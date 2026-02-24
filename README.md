# Control de Vehículos - Frontend 

Este es el frontend de una aplicación web diseñada para gestionar el registro de vehículos y el historial de sus movimientos (entradas y salidas). Construido con **React + Vite** y utilizando los componentes de **PrimeReact**.

## Tecnologías Utilizadas

* **React 19** (Vite como bundler)
* **PrimeReact** (Librería de componentes UI)
* **PrimeIcons** (Iconografía)
* **PrimeFlex** (Utilidades de diseño CSS)
* **React Hook Form** (Gestión de formularios y validaciones)

## Requisitos Previos

Asegúrate de tener instalados los siguientes elementos:

* **Node.js** (Versión 18 o superior recomendada)
* **Git**
* Un **Backend** funcional (conectado a PostgreSQL) corriendo en `http://localhost:3000`

## Instalación y Configuración

Sigue estos pasos para clonar e instalar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/elvishn20/FrontendVehiculos.git](https://github.com/elvishn20/FrontendVehiculos.git)
   cd FrontendVehiculos

2. **Instalación de Node.js**
Asegúrese de tener instalado Node.js (versión 18 o superior). Puede verificarlo ejecutando node -v en su terminal.

3. **Instalar Dependencias Generales**
Para descargar e instalar todas las librerías necesarias (PrimeReact, React Hook Form, etc.), ejecute:

npm install

4. **Configurar el Backend**
Este frontend está configurado para comunicarse con una API en http://localhost:3000. Asegúrese de que su servidor de Node.js esté activo para que las tablas de vehículos y movimientos carguen los datos correctamente.

5. **Ejecutar la Aplicación**
Una vez instaladas las dependencias, inicie el servidor de desarrollo:

npm run dev