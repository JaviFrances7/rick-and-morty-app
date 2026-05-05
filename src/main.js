// Este archivo es el principal de la aplicación.
// Se encarga de manejar los eventos (formularios, botones),
// llamar a la API y actualizar la interfaz.

import "../sass/app.scss";
import { getEpisode } from "./api";
import { searchCharacters } from "./crud";
import { renderCharacters } from "./ui";

let currentPage = 1;

// selección de elementos del DOM
const form = document.querySelector(".form");
const form2 = document.querySelector(".form2");

const loadMoreBtn = document.getElementById("load-more");
const clearBtn = document.getElementById("clear");
const clearEpisodeBtn = document.getElementById("clear-episode");

const episodeInfo = document.getElementById("episode-info");
const container = document.getElementById("characters-container");
const loading = document.getElementById("loading");

// =====================
// LOADING
// =====================
// muestra el spinner mientras se hacen peticiones
const showLoading = () => {
  loading.style.display = "block";
};

// oculta el spinner cuando termina la petición
const hideLoading = () => {
  loading.style.display = "none";
};

// =====================
// BUSCAR PERSONAJES
// =====================
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // reinicia la paginación
  currentPage = 1;

  // obtiene los valores del formulario
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;

  // limpia la información del episodio si había una búsqueda previa
  episodeInfo.innerHTML = "";
  episodeInfo.style.display = "none";

  showLoading();

  // llama a la API con los filtros
  const response = await searchCharacters(name, status, currentPage);

  hideLoading();

  // pinta los resultados o limpia si no hay
  if (response.results) {
    renderCharacters(response.results);
  } else {
    renderCharacters([]);
  }

  // muestra u oculta el botón de cargar más según haya más páginas
  loadMoreBtn.style.display = response.info.next ? "block" : "none";
});

// =====================
// LOAD MORE
// =====================
// carga más personajes (paginación)
loadMoreBtn.addEventListener("click", async () => {
  currentPage++;

  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;

  showLoading();

  const response = await searchCharacters(name, status, currentPage);

  hideLoading();

  // añade los nuevos personajes a los existentes
  if (response.results) {
    renderCharacters(response.results, true);
  }

  // si no hay más páginas, oculta el botón
  if (!response.info.next) {
    loadMoreBtn.style.display = "none";
  }
});

// =====================
// RESET PERSONAJES
// =====================
// limpia el formulario de personajes y la pantalla
clearBtn.addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.getElementById("status").value = "";

  container.innerHTML = "";

  // también limpia cualquier info de episodio
  episodeInfo.innerHTML = "";
  episodeInfo.style.display = "none";

  loadMoreBtn.style.display = "none";
  currentPage = 1;
});

// =====================
// BUSCAR EPISODIO
// =====================
form2.addEventListener("submit", async (event) => {
  event.preventDefault();

  const episode = document.getElementById("episode").value;

  showLoading();

  // obtiene el episodio y sus personajes
  const result = await getEpisode(episode);

  hideLoading();

  // si no hay resultados, limpia la pantalla
  if (!result) {
    renderCharacters([]);
    episodeInfo.innerHTML = "";
    episodeInfo.style.display = "none";
    return;
  }

  const { episodeData, characters } = result;

  // muestra la información del episodio
  episodeInfo.innerHTML = `
    <h2>${episodeData.name}</h2>
    <p>${episodeData.episode}</p>
    <p>${episodeData.air_date}</p>
  `;

  episodeInfo.style.display = "block";

  // muestra los personajes del episodio
  renderCharacters(characters);

  // en episodios no hay paginación
  loadMoreBtn.style.display = "none";
});

// =====================
// RESET EPISODIO
// =====================
// limpia el formulario de episodios y la pantalla
clearEpisodeBtn.addEventListener("click", () => {
  document.getElementById("episode").value = "";

  episodeInfo.innerHTML = "";
  episodeInfo.style.display = "none";

  container.innerHTML = "";

  loadMoreBtn.style.display = "none";
});
