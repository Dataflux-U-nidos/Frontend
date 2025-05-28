import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../atoms/ui/table"; // ajusta la ruta si es necesario

type DataRow = Record<string, any>;

interface DynamicTableProps {
  data: DataRow[];
  caption?: string;
  rowsPerPage?: number;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ 
  data, 
  caption, 
  rowsPerPage = 10 
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>("all");

  if (data.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-gray-400 text-lg mb-2">📋</div>
        <div className="text-gray-600 font-medium">No hay datos disponibles</div>
        <div className="text-gray-500 text-sm">Los datos aparecerán aquí cuando estén disponibles</div>
      </div>
    );
  }

  const headers = Object.keys(data[0]);
  
  // Traducir encabezados para mostrar en español
  const headerTranslations: Record<string, string> = {
    Nombre: "Nombre",
    Apellidos: "Apellidos", 
    TipoDocumento: "Tipo Doc.",
    NoDocumento: "No. Documento",
    Edad: "Edad",
    NombreAcudiente: "Acudiente",
    CelularContacto: "Celular",
    EmailContacto: "Email",
    state: "Estado",
    email: "Correo",
    name: "Nombre",
    age: "Edad",
    school: "Colegio",
    location: "Localidad",
    university: "Universidad",
    suscription: "Suscripción",
    cost: "Costo (USD)",
    type: "Tipo",
    date: "Fecha"
  };

  // Obtener valores únicos para los filtros
  const uniqueStates = [...new Set(data.map(row => row.state || row.Estado))].filter(Boolean);
  const uniqueDocumentTypes = [...new Set(data.map(row => row.TipoDocumento))].filter(Boolean);

  // Función para obtener el color del estado
  const getStateColor = (state: string) => {
    const stateColors: Record<string, string> = {
      'CONTACTADO': 'bg-green-100 text-green-800 border-green-200',
      'PENDIENTE': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'PROGRESO': 'bg-blue-100 text-blue-800 border-blue-200',
      'COMPLETADO': 'bg-purple-100 text-purple-800 border-purple-200',
      'CANCELADO': 'bg-red-100 text-red-800 border-red-200'
    };
    return stateColors[state] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Función para formatear valores
  const formatValue = (value: any, header: string): React.ReactNode => {
    if (header === "state" || header === "Estado") {
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStateColor(value)}`}>
          {value}
        </span>
      );
    }
    
    if (header === "TipoDocumento") {
      const docTypeColors = {
        'CC': 'bg-blue-50 text-blue-700 border-blue-200',
        'TI': 'bg-green-50 text-green-700 border-green-200',
        'CE': 'bg-purple-50 text-purple-700 border-purple-200'
      };
      return (
        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${docTypeColors[value as keyof typeof docTypeColors] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
          {value}
        </span>
      );
    }

    if (header === "type") {
      return value === "scholar" ? "Escolar" : value === "university" ? "Universitaria" : value;
    }
    
    if (header === "date" && value) {
      try {
        const date = new Date(value);
        return date.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\//g, '/');
      } catch (error) {
        return value;
      }
    }
    
    if (header === "Edad" || header === "age") {
      return (
        <span className="inline-flex items-center">
          <span className="text-sm font-medium text-gray-900">{value}</span>
          <span className="text-xs text-gray-500 ml-1">años</span>
        </span>
      );
    }

    if (header === "EmailContacto" || header === "email") {
      return (
        <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
          {value}
        </a>
      );
    }

    if (header === "CelularContacto") {
      return (
        <a href={`tel:${value}`} className="text-green-600 hover:text-green-800 hover:underline text-sm font-mono">
          {value}
        </a>
      );
    }

    if (header === "NombreAcudiente" && value === "-") {
      return (
        <span className="text-gray-400 italic text-sm">No aplica</span>
      );
    }
    
    return value;
  };

  // Filtrar datos
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesSearch = searchTerm === "" || 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesState = stateFilter === "all" || 
        (row.state || row.Estado) === stateFilter;
      
      const matchesAge = ageFilter === "all" || 
        (ageFilter === "minor" && (row.Edad || row.age) < 18) ||
        (ageFilter === "adult" && (row.Edad || row.age) >= 18);
        
      const matchesDocType = documentTypeFilter === "all" || 
        row.TipoDocumento === documentTypeFilter;
      
      return matchesSearch && matchesState && matchesAge && matchesDocType;
    });
  }, [data, searchTerm, stateFilter, ageFilter, documentTypeFilter]);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Calcular paginación
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStateFilter("all");
    setAgeFilter("all");
    setDocumentTypeFilter("all");
    setCurrentPage(1);
  };

  // Función para renderizar vista móvil de cada fila
  const renderMobileRow = (row: DataRow, index: number) => (
    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      {headers.map(header => (
        <div key={header} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
          <span className="font-medium text-gray-600 text-sm">
            {headerTranslations[header] || header}:
          </span>
          <span className="text-gray-900 text-sm text-right">
            {formatValue(row[header], header)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {caption && (
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">{caption}</h2>
        </div>
      )}
      
      {/* Filtros y búsqueda */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Búsqueda */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Buscar
            </label>
            <input
              type="text"
              placeholder="Buscar por nombre, email, documento..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Filtro por estado */}
          {uniqueStates.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📊 Estado
              </label>
              <select
                value={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="all">Todos los estados</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          )}

          {/* Filtro por edad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Edad
            </label>
            <select
              value={ageFilter}
              onChange={(e) => {
                setAgeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value="all">Todas las edades</option>
              <option value="minor">Menores de edad (&lt;18)</option>
              <option value="adult">Mayores de edad (≥18)</option>
            </select>
          </div>
        </div>

        {/* Filtro por tipo de documento */}
        {uniqueDocumentTypes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📋 Tipo de Documento
              </label>
              <select
                value={documentTypeFilter}
                onChange={(e) => {
                  setDocumentTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="all">Todos los tipos</option>
                {uniqueDocumentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Indicadores de filtros activos y botón limpiar */}
        <div className="flex flex-wrap items-center gap-2">
          {(searchTerm || stateFilter !== "all" || ageFilter !== "all" || documentTypeFilter !== "all") && (
            <>
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Búsqueda: "{searchTerm}"
                </span>
              )}
              {stateFilter !== "all" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Estado: {stateFilter}
                </span>
              )}
              {ageFilter !== "all" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Edad: {ageFilter === "minor" ? "Menores" : "Mayores"}
                </span>
              )}
              {documentTypeFilter !== "all" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Doc: {documentTypeFilter}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                ✕ Limpiar filtros
              </button>
            </>
          )}
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredData.length} de {data.length} registros
          {filteredData.length !== data.length && " (filtrados)"}
        </div>
      </div>
      
      {/* Vista para tablet y desktop */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <TableRow>
                {headers.map(header => (
                  <TableHead 
                    key={header}
                    onClick={() => handleSort(header)}
                    className="cursor-pointer px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{headerTranslations[header] || header}</span>
                      <div className="flex flex-col">
                        <span className={`text-xs ${sortKey === header && sortOrder === "asc" ? "text-orange-500" : "text-gray-400"}`}>▲</span>
                        <span className={`text-xs ${sortKey === header && sortOrder === "desc" ? "text-orange-500" : "text-gray-400"}`}>▼</span>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, i) => (
                <TableRow 
                  key={i} 
                  className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                >
                  {headers.map(header => (
                    <TableCell key={header} className="px-6 py-4 text-sm">
                      {formatValue(row[header], header)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Vista móvil - filas como tarjetas */}
      <div className="md:hidden">
        <div className="space-y-4">
          {paginatedData.map((row, index) => renderMobileRow(row, index))}
        </div>
      </div>

      {/* Paginación mejorada */}
      {totalPages > 1 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{startIndex + 1}</span> a{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(startIndex + rowsPerPage, filteredData.length)}
              </span>{" "}
              de <span className="font-semibold text-gray-900">{filteredData.length}</span> resultados
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  currentPage === 1
                    ? "text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                ← Anterior
              </button>
              
              {/* Botones de página mejorados */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true;
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .map((page, index, array) => {
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <React.Fragment key={`ellipsis-${page}`}>
                        <span className="px-2 text-gray-400">...</span>
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            currentPage === page
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-md"
                              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        currentPage === page
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-md"
                          : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};