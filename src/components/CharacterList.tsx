import { useEffect, useState } from "react";
import { getCharacters } from "../api/marvel";
import { Busqueda } from "./Busqueda";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";


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
    char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
    <div className="container mx-auto p-4">
      <Busqueda setSearchTerm={setSearchTerm} />

      <h2 className="mb-6">{filteredCharacters.length} RESULTS</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCharacters.map((char) => (
          <div key={char.id} className=" overflow-hidden">
            <Link to={`/others/${char.id}`}>
                <div className="h-64 w-full overflow-hidden">
                <img
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                  alt={char.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                </div>
            </Link>
            
            <div className="bg-black text-white p-6 h-22 flex items-center relative group ">

            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <div className="flex justify-between items-center w-full relative z-10">
                  <h3 className="font-bold text-sm truncate flex-1 mr-2">{char.name}</h3>
                
                <button
                  onClick={() => toggleFavorite(char)}
                  className="text-xl focus:outline-none flex-shrink-0"
                  aria-label={favorites.some((fav) => fav.id === char.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                  {favorites.some((fav) => fav.id === char.id) ? (
                    <FaHeart className="text-red-500 group-hover:text-white transition-colors duration-300 ease-in-out" />
                  ) : (
                    <FaRegHeart className="text-white hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CharacterList;