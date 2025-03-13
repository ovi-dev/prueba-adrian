import axios from "axios";
import md5 from "crypto-js/md5";

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public";

// Función para obtener el hash de autenticación
const getAuthParams = () => {
  const ts = Date.now().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  return { ts, apikey: PUBLIC_KEY, hash };
};

// Obtener los primeros 50 personajes
export const getCharacters = async () => {
  try {
    const authParams = getAuthParams();
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        ...authParams,
        limit: 50,
      },
    });
     return response.data.data.results;

  } catch (error) {
    console.error("Error obteniendo personajes:", error);
    return [];
  }
};


// corregida para obtener detalles de un personaje por ID
export const getCharacterById = async (id: string) => {
  try {
    const authParams = getAuthParams();

    // Obtener la información del personaje
    const characterResponse = await axios.get(`${BASE_URL}/characters/${id}`, {
      params: authParams,
    });

    const character = characterResponse.data.data.results[0];

    // Obtener detalles de los cómics en los que aparece el personaje
    const comicsResponse = await axios.get(
      `${BASE_URL}/characters/${id}/comics`,
      {
        params: {
          ...authParams,
          limit: 10, // Número de cómics a obtener
        },
      },
    );

    // Agregar los cómics con imágenes al objeto del personaje
    character.comicsList = comicsResponse.data.data.results.map(
      (comic: any) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      }),
    );

    return character;
  } catch (error) {
    console.error("Error obteniendo personaje:", error);
    return null;
  }
};
