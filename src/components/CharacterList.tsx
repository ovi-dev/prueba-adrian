import { useEffect, useState } from "react";
import { getCharacters } from "../api/marvel";
import { Busqueda } from "./Busqueda";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters();
      setCharacters(data);
    };
    fetchData();
    
    // Cargar favoritos desde localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Función para alternar favoritos
  const toggleFavorite = (character: Character) => {
    const isFav = favorites.some((fav) => fav.id === character.id);
    let updatedFavorites;

    if (isFav) {
      updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
    } else {
      updatedFavorites = [...favorites, character];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Filtrar personajes según búsqueda
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
