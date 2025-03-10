import { useState } from "react";
import { Link } from "react-router-dom";



const Header = () => {

  const [favoritesCount, setFavoritesCount] = useState(0);
  return (
    <header className="flex flex-col sm:flex-row items-center bg-black p-4">
      <Link 
      to="/"
      className="text-white text-2xl font-bold"
      >
      <img
      src="src/assets/Marvel_Logo.svg" alt="Logo" className="w-32 h-auto mr-4 mb-4 sm:mb-0" />
      </Link>

      <Link to="/favorites" className="flex items-end text-white mt-2 sm:mt-0 ml-auto">
        <span className="text-red-500 text-2xl mr-1">❤️</span>
        <span className=" rounded-full px-2 py-1 text-md">
          {favoritesCount}
        </span>
      </Link>

     
      
    </header>
  );
};

export default Header;