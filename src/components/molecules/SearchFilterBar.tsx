import React from "react";

type SearchFilterBarProps = {
  onSearch?: (searchTerm: string) => void;
  onAddEntity?: () => void;
  onFilter?: () => void;
  addButtonLabel?: string;
  searchPlaceholder?: string;
  showFilterButton?: boolean;
  showAddButton?: boolean;
  className?: string;
};

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch,
  onAddEntity,
  onFilter,
  addButtonLabel = "",
  searchPlaceholder = "Buscar",
  showFilterButton = true,
  showAddButton = true,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      {/* Barra de búsqueda */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex space-x-2">
        {/* Botón de filtros */}
        {showFilterButton && (
          <button 
            className="p-2 rounded-lg text-gray-500 border border-gray-300 hover:bg-gray-100"
            onClick={onFilter}
            aria-label="Filtrar"
            title="Filtrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
          </button>
        )}
        
        {/* Botón de agregar */}
        {showAddButton && (
          <button 
            className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center"
            onClick={onAddEntity}
            aria-label={addButtonLabel || "Agregar"}
            title={addButtonLabel || "Agregar"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            {addButtonLabel && (
              <span className="ml-2 hidden sm:inline">{addButtonLabel}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};