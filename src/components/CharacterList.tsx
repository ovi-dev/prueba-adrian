import { useEffect, useState } from "react";
import { getCharacters } from "../api/marvel";
import { Busqueda } from "./Busqueda";
import { useFavoritesStore } from "../store/useFavoritesStore";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { favorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("characters");
      const cacheTimestamp = localStorage.getItem("characters_timestamp");

      if (cachedData && cacheTimestamp) {
        const timeElapsed = Date.now() - parseInt(cacheTimestamp, 10);
        if (timeElapsed < CACHE_DURATION) {
          setCharacters(JSON.parse(cachedData));
          return;
        }
      }

      // Si no hay caché válido, obtener nuevos datos
      const data = await getCharacters();
      setCharacters(data);

      // Guardar en localStorage
      localStorage.setItem("characters", JSON.stringify(data));
      localStorage.setItem("characters_timestamp", Date.now().toString());
    };

    fetchData();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Busqueda setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCharacters.map((char) => (
          <div key={char.id} className="border p-2 rounded-lg shadow-md">
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              className="w-full h-40 object-cover rounded-md"
              loading="lazy" // Para cargar solo cuando sea necesario
            />
            <h3 className="text-center font-bold mt-2">{char.name}</h3>
            <button
              onClick={() => toggleFavorite(char)}
              className={`mt-2 px-4 py-1 rounded ${
                favorites.some((fav) => fav.id === char.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {favorites.some((fav) => fav.id === char.id) ? "❤️ Quitar" : "🤍 Favorito"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
