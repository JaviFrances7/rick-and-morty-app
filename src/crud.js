// Este archivo se encarga de preparar los filtros de búsqueda de personajes
// y llamar a la función que hace la petición a la API.

import { getCharacters } from "./api";

// Busca personajes según nombre, estado y página
export const searchCharacters = async (name, status, page) => {
  const filters = {};

  // añade la página para la paginación
  filters.page = page;

  // si hay nombre, lo añade a los filtros
  if (name) {
    filters.name = name;
  }

  // si hay estado, lo añade a los filtros
  if (status) {
    filters.status = status;
  }

  // llama a la API con los filtros construidos
  const data = await getCharacters(filters);

  // devuelve los datos recibidos
  return data;
};
