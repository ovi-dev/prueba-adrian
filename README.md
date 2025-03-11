# Marvel Characters App

Bienvenido a **Marvel Characters App**, una aplicación que te permite explorar información sobre personajes de Marvel, ver sus cómics y gestionar tus favoritos.

## 🚀 Características

- Listado de 50 personajes de Marvel con imágenes y nombres.
- Buscador para encontrar personajes específicos.
- Sección de favoritos para guardar y visualizar tus personajes preferidos.
- Vista detallada con información adicional y cómics en los que aparecen los personajes.

## 🛠️ Tecnologías utilizadas

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (para la gestión del estado de favoritos)
- **React Router** (para la navegación)
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

El proyecto estará disponible en [http://localhost:5173](http://localhost:5173)

## 🌐 Despliegue en producción

La aplicación está desplegada en Vercel y puedes verla en:
🔗 [Marvel Characters App / Mi prueba](https://prueba-adrian.vercel.app/)

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, puedes contactarme en **adrian311@gmail.com**.

---

🦸‍♂️ ¡Disfruta explorando el universo Marvel! 🚀
