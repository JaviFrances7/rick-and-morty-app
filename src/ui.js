// Este archivo se encarga de pintar los personajes en pantalla.
// Crea las tarjetas dinámicamente con la información de cada personaje.

const container = document.getElementById("characters-container");

// Renderiza los personajes en el contenedor
// append = true sirve para añadir más personajes sin borrar los anteriores (paginación)
export const renderCharacters = (characters, append = false) => {
  // si no estamos añadiendo, limpia el contenedor antes de pintar
  if (!append) {
    container.innerHTML = "";
  }

  // recorre cada personaje recibido
  characters.forEach((character) => {
    // crea un div para la tarjeta
    const card = document.createElement("div");

    // obtiene los primeros 5 episodios del personaje
    // se queda solo con el número del episodio (última parte de la URL)
    const episodes =
      character.episode
        .slice(0, 5)
        .map((ep) => ep.split("/").pop())
        .join(", ") + "...";

    // contenido HTML de la tarjeta
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h3>${character.name}</h3>

      <div class="extra">
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Location: ${character.location.name}</p>
        <p>Episodes: ${episodes}</p>
      </div>
    `;

    // añade la tarjeta al contenedor
    container.appendChild(card);
  });
};
