# Marvel Characters App

Bienvenido a **Marvel Characters App**, una aplicación que te permite explorar información sobre personajes de Marvel, ver sus cómics y gestionar tus favoritos.

## 🚀 Características

- Listado de 50 personajes de Marvel con imágenes y nombres.
- Buscador para encontrar personajes específicos.
- Sección de favoritos para guardar y visualizar tus personajes preferidos.
- Vista detallada con información adicional y cómics en los que aparecen los personajes.
- Pruebas unitarias para garantizar la estabilidad del código.

## 🛠️ Tecnologías utilizadas

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (para la gestión del estado de favoritos)
- **React Router** (para la navegación)
- **Jest + React Testing Library** (para pruebas unitarias)
- **Marvel API** (para obtener la información de los personajes y cómics)

## 📦 Instalación y ejecución

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1️⃣ Clonar el repositorio

```sh
git clone git@github.com:ovi-dev/prueba-adrian.git
cd prueba-adrian
```

### 2️⃣ Instalar dependencias

```sh
yarn install
# o
npm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```sh
VITE_MARVEL_PUBLIC_KEY=tu_public_key
VITE_MARVEL_PRIVATE_KEY=tu_private_key
```

> **Nota:** Necesitas una cuenta en [Marvel Developer](https://developer.marvel.com/) para obtener las claves de la API.

### 4️⃣ Ejecutar el proyecto en modo desarrollo

```sh
yarn dev
# o
npm run dev
```

El proyecto estará disponible en [http://localhost:5173](http://localhost:5173).

## 🚀 Construcción y despliegue

Para generar la versión optimizada para producción, ejecuta:

```sh
yarn build
# o
npm run build
```

Esto generará una carpeta `dist` con los archivos listos para desplegar en cualquier servidor estático o en plataformas como **Vercel** o **Netlify**.

### 🌐 Despliegue en producción

La aplicación está desplegada en Vercel y puedes verla en:  
🔗 [Marvel Characters App](https://prueba-adrian.vercel.app/)

## 🧪 Pruebas

El proyecto cuenta con pruebas unitarias escritas con **Jest** y **React Testing Library**. Para ejecutarlas, usa:

```sh
yarn test
# o
npm run test
```

Para ejecutar las pruebas en modo interactivo con watch:

```sh
yarn test:watch
# o
npm run test:watch
```

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, puedes contactarme en **adrian311@gmail.com**.

---


