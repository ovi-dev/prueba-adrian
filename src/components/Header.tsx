import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    // Obtener favoritos desde localStorage
    const updateFavoritesCount = () => {
      const storedFavorites = localStorage.getItem("favorites");
      setFavoritesCount(storedFavorites ? JSON.parse(storedFavorites).length : 0);
    };

    updateFavoritesCount(); // Ejecutar al montar

    // Escuchar cambios en localStorage
    window.addEventListener("storage", updateFavoritesCount);

    return () => {
      window.removeEventListener("storage", updateFavoritesCount);
    };
  }, []);

  return (
    <header className="flex justify-between items-center bg-black p-4">
      <Link to="/" className="text-white text-2xl font-bold flex items-center">
        <img
          src="src/assets/Marvel_Logo.svg"
          alt="Logo"
          className="w-32 h-auto mr-4"
        />
      </Link>

      <Link to="/favorites" className="flex items-center text-white relative">
        <span className="text-red-500 text-2xl mr-1">❤️</span>
        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
          {favoritesCount}
        </span>
      </Link>
    </header>
  );
};

export default Header;
