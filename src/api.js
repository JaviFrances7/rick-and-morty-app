// Este archivo se encarga de hacer las peticiones a la API de Rick and Morty.
// Aquí se obtienen los datos de personajes y episodios.

const API_URL = "https://rickandmortyapi.com/api/character";

// Obtiene personajes usando filtros (nombre, estado, página, etc.)
export const getCharacters = async (params = {}) => {
  // convierte el objeto de parámetros en query string (?name=rick&status=alive...)
  const query = new URLSearchParams(params);

  // hace la petición a la API con los filtros
  const response = await fetch(`${API_URL}?${query.toString()}`);

  // devuelve los datos en formato JSON
  return await response.json();
};

// Obtiene un episodio (por número o por nombre) y sus personajes
export const getEpisode = async (episode) => {
  let url = "";

  // comprueba si lo que ha introducido el usuario es un número o texto
  if (!isNaN(episode)) {
    // si es número, busca directamente por id
    url = `https://rickandmortyapi.com/api/episode/${episode}`;
  } else {
    // si es texto, busca por nombre del episodio
    url = `https://rickandmortyapi.com/api/episode?name=${episode}`;
  }

  // hace la petición del episodio
  const response = await fetch(url);
  const data = await response.json();

  // si viene un array (búsqueda por nombre), coge el primer resultado
  // si no, usa el objeto directamente (búsqueda por id)
  const episodeData = data.results ? data.results[0] : data;

  // a partir del episodio, obtiene todos los personajes (cada uno es otra petición)
  const characters = await Promise.all(
    episodeData.characters.map(async (url) => {
      const res = await fetch(url);
      return res.json();
    }),
  );

  // devuelve tanto la info del episodio como los personajes
  return {
    episodeData,
    characters,
  };
};
