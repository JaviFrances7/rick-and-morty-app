# Rick and Morty App

Aplicación web que permite buscar personajes y episodios de la API de Rick and Morty.

El usuario puede filtrar personajes por nombre y estado, ver más resultados con paginación y consultar episodios para ver qué personajes aparecen en cada uno.

---

## 🚀 Funcionalidades

- Búsqueda de personajes por nombre
- Filtro por estado (Alive, Dead, Unknown)
- Paginación con botón "Load more"
- Búsqueda de episodios por número o nombre
- Visualización de personajes de un episodio
- Información del episodio (nombre, código y fecha)
- Spinner de carga
- Reset independiente para cada formulario

---

## 🛠 Tecnologías usadas

- HTML
- SCSS
- JavaScript (ES6)
- Fetch API
- Rick and Morty API

---

## 📦 Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
npm install
npm run dev
```

---

## 🌐 API utilizada

https://rickandmortyapi.com/

---

## 📁 Estructura del proyecto

- api.js → llamadas a la API
- crud.js → lógica de filtros
- main.js → control de la aplicación
- ui.js → renderizado en pantalla
- scss/ → estilos

---

## 📌 Notas

Este proyecto está hecho como práctica de consumo de APIs y manipulación del DOM.

---

## 🔮 Posibles mejoras

- Vista detalle de personaje
- Mostrar múltiples episodios en búsquedas por nombre
- Animaciones en la UI
- Mejor gestión de errores
