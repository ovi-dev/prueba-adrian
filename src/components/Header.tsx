import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore";
import MarvelLogo from "../assets/Marvel_Logo.svg";

const Header = () => {
  const { favorites } = useFavoritesStore();

  return (
    <header className="flex justify-between items-center bg-black p-4 h-25">
      <Link to="/" className="text-white text-2xl font-bold flex items-center">
        <img
          src={MarvelLogo}
          alt="Logo"
          className="w-32 h-auto mr-4"
        />
      </Link>

      <Link to="/favorites" className="flex items-center text-white relative">
        <span className="text-red-500 text-2xl mr-1">❤️</span>
        <span className=" text-white  px-2 py-1 text-sm">
          {favorites.length}
        </span>
      </Link>
    </header>
  );
};

export default Header;
