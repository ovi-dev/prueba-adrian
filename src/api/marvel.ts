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

// Obtener detalles de un personaje por ID
export const getCharacterById = async (characterId: number) => {
  try {
    const authParams = getAuthParams();
    const response = await axios.get(`${BASE_URL}/characters/${characterId}`, {
      params: authParams,
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error("Error obteniendo personaje:", error);
    return null;
  }
};
