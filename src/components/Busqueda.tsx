

interface BusquedaProps {
  setSearchTerm: (term: string) => void;
}



export const Busqueda = ({ setSearchTerm }: BusquedaProps) => {

 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Evento que se dispara cuando el usuario escribe en el input
    setSearchTerm(event.target.value); 
  };
    

  return (
<div className="w-full flex justify-center items-center mt-4 mb-2 relative">
  
<svg className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 2a8 8 0 0 1 8 8c0 1.738-.558 3.348-1.5 4.667l4.917 4.916a1 1 0 0 1-1.414 1.414l-4.916-4.917A7.963 7.963 0 0 1 10 18a8 8 0 1 1 0-16zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 10 4z" />
      </svg>

  <input
    type="text"
    placeholder="Buscar Superhéroe"
    className="w-300 px-2 py-1 ml-6 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
    onChange={handleInputChange} // cuando se comienza a escribir
  />
</div>

    
  )
}


