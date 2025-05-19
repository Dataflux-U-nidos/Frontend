import React, { useState } from "react";
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

  if (data.length === 0) {
    return <div className="text-center p-4">No hay datos disponibles.</div>;
  }

  const headers = Object.keys(data[0]);
  
  // Traducir encabezados para mostrar en español
  const headerTranslations: Record<string, string> = {
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

  // Función para formatear valores
  const formatValue = (value: any, header: string): string => {
    if (header === "type") {
      return value === "scholar" ? "Escolar" : value === "university" ? "Universitaria" : value;
    }
    
    if (header === "date" && value) {
      try {
        const date = new Date(value);
        // Formato año/mes/día
        return date.toLocaleDateString('es-CO', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\//g, '/');
      } catch (error) {
        return value;
      }
    }
    
    if (header === "age") {
      return `${value} Años`;
    }
    
    return value;
  };

  const sortedData = [...data].sort((a, b) => {
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

  // Función para renderizar vista móvil de cada fila
  const renderMobileRow = (row: DataRow, index: number) => (
    <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
      {headers.map(header => (
        <div key={header} className="flex justify-between items-center py-2 border-b last:border-b-0">
          <span className="font-medium text-gray-600">
            {headerTranslations[header] || header}:
          </span>
          <span className="text-gray-900">
            {formatValue(row[header], header)}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      {caption && <h2 className="text-xl font-semibold mb-4">{caption}</h2>}
      
      {/* Vista para tablet y desktop */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead 
                  key={header}
                  onClick={() => handleSort(header)}
                  className="cursor-pointer p-4 text-left text-sm font-medium text-gray-500"
                >
                  {headerTranslations[header] || header} 
                  {sortKey === header ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow key={i}>
                {headers.map(header => (
                  <TableCell key={header} className="p-4">
                    {formatValue(row[header], header)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Vista móvil - filas como tarjetas */}
      <div className="md:hidden">
        <div className="space-y-4">
          {paginatedData.map((row, index) => renderMobileRow(row, index))}
        </div>
      </div>

      {/* Paginación - ajustada para móviles */}
      {totalPages > 1 && (
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a{" "}
              <span className="font-medium">
                {Math.min(startIndex + rowsPerPage, data.length)}
              </span>{" "}
              de {data.length} resultados
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 sm:px-3 py-1 text-sm rounded ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Anterior
              </button>
              
              {/* En móvil mostramos menos botones de página */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 5) return true;
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .map((page, index, array) => {
                  // Agregar indicador de páginas saltadas
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <React.Fragment key={`ellipsis-${page}`}>
                        <span className="px-2 text-gray-400">...</span>
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-2 sm:px-3 py-1 text-sm rounded ${
                            currentPage === page
                              ? "bg-orange-500 text-white"
                              : "text-gray-700 hover:bg-gray-100"
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
                      className={`px-2 sm:px-3 py-1 text-sm rounded ${
                        currentPage === page
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 sm:px-3 py-1 text-sm rounded ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};