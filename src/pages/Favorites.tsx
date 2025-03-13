import { FaHeart } from "react-icons/fa";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Busqueda } from "../components/Busqueda";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar favoritos según el término de búsqueda
  const filteredFavorites = favorites.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="uppercase text-3xl font-bold mb-8 mt-8">favorites</h1>
      {/* Barra de búsqueda */}
      <Busqueda setSearchTerm={setSearchTerm} />
      <h1 className=" mb-10 mt-3">{filteredFavorites.length} RESULTADO </h1>
      
      {filteredFavorites.length === 0 ? (
        <p className="uppercase">No tienes personajes favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredFavorites.map((char) => (
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

              <div className="bg-black text-white p-4 h-22 flex items-center relative group  ">
                {/* linea fija roja */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 group-hover:h-full transition-all duration-300 ease-in-out"></div>
                <div className="flex justify-between items-center w-full relative z-10 ">
                  <h3 className="font-bold text-sm truncate flex-1 mr-2">{char.name}</h3>
                  <button
                    onClick={() => toggleFavorite(char)}
                    className="text-xl focus:outline-none flex-shrink-0"
                    aria-label={favorites.some((fav) => fav.id === char.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                  >
                    <FaHeart className="text-red-500 group-hover:text-white transition-colors duration-300 ease-in-out" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
