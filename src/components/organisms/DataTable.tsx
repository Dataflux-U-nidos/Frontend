import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/atoms/ui/table";
import { Button } from "@/components/atoms/ui/button";

// Interfaz genérica para cualquier entidad
interface Entity {
  [key: string]: any;
}

// Nueva interfaz para acciones
interface Action<T> {
  label: string;
  onClick: (entity: T) => void;
  variant?: "default" | "danger" | "secondary" | "outline";
  icon?: React.ReactNode;
}

interface DataTableProps<T extends Entity> {
  data: T[];
  caption?: string;
  rowsPerPage?: number;
  onViewDetails?: (entity: T) => void;
  displayColumns?: string[]; // Columnas a mostrar
  columnHeaders?: Record<string, string>; // Traducciones de encabezados
  actionButtonText?: string;
  className?: string;
  actions?: Action<T>[];  // Nueva propiedad para múltiples acciones
  isLoading?: boolean;
}

export function DataTable<T extends Entity>({ 
  data, 
  caption, 
  rowsPerPage = 10,
  onViewDetails,
  displayColumns,
  columnHeaders = {},
  actionButtonText = "Ver detalles",
  className = "",
  actions = [],
  isLoading = false
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div className="rounded-lg overflow-hidden shadow p-6 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="h-6 w-6 bg-gray-200 rounded-full mr-2"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return <p className="p-4 text-center text-gray-500">No hay datos disponibles.</p>;
  }

  // Determinar las columnas a mostrar
  const headers = displayColumns || Object.keys(data[0]);
  
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

  // Función para manejar clic en el botón de detalles
  const handleViewDetails = (entity: T) => {
    if (onViewDetails) {
      onViewDetails(entity);
    } else {
      console.log("Ver detalles de:", entity);
    }
  };

  // Obtener el color de fondo del botón según la variante
  const getButtonBgClass = (variant?: string) => {
    switch (variant) {
      case "danger":
        return "bg-red-500 hover:bg-red-600";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-600";
      case "outline":
        return "bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50";
      default:
        return "bg-orange-500 hover:bg-orange-600";
    }
  };

  // Obtener el color de texto del botón según la variante
  const getButtonTextClass = (variant?: string) => {
    return variant === "outline" ? "text-orange-500" : "text-white";
  };

  // Función para renderizar vista móvil de cada fila
  const renderMobileRow = (row: T, index: number) => (
    <div key={index} className="bg-peach-50 p-4 rounded-lg shadow mb-3 border border-gray-200">
      {headers.map(header => (
        <div key={header} className="py-1">
          <span className="font-medium text-gray-500 mr-2">
            {columnHeaders[header] || header}:
          </span>
          <span>
            {row[header]}
          </span>
        </div>
      ))}
      <div className="mt-3 flex justify-end space-x-2">
        {/* Primero el botón de detalles (si hay onViewDetails) */}
        {onViewDetails && (
          <Button 
            onClick={() => handleViewDetails(row)} 
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1 text-sm"
          >
            {actionButtonText}
          </Button>
        )}
        
        {/* Luego los botones de acciones adicionales */}
        {actions.map((action, i) => (
          <Button 
            key={`action-${i}`}
            onClick={() => action.onClick(row)}
            className={`${getButtonBgClass(action.variant)} ${getButtonTextClass(action.variant)} rounded-md px-3 py-1 text-sm flex items-center`}
          >
            {action.icon && <span className="mr-1">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`rounded-lg overflow-hidden shadow ${className}`}>
      {caption && <div className="p-3 text-center text-sm text-gray-500">{caption}</div>}
      
      {/* Vista para tablet y desktop */}
      <div className="hidden md:block">
        <Table className="w-full">
          <TableHeader className="bg-gray-50 border-b">
            <TableRow>
              {headers.map(header => (
                <TableHead
                  key={header}
                  onClick={() => handleSort(header)}
                  className="cursor-pointer p-4 text-left text-sm font-medium text-gray-500"
                >
                  {columnHeaders[header] || header}
                  {sortKey === header ? (sortOrder === "asc" ? " ↑" : " ↓") : ""}
                </TableHead>
              ))}
              {/* Columna adicional para acciones */}
              <TableHead className="p-4 text-left text-sm font-medium text-gray-500">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow 
                key={i} 
                className="bg-peach-50 hover:bg-orange-50 border-b"
              >
                {headers.map(header => (
                  <TableCell key={header} className="p-4 text-sm">
                    {row[header]}
                  </TableCell>
                ))}
                {/* Celda para botones de acciones */}
                <TableCell className="p-4">
                  <div className="flex space-x-2">
                    {/* Primero el botón de detalles (si hay onViewDetails) */}
                    {onViewDetails && (
                      <Button 
                        onClick={() => handleViewDetails(row)} 
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-3 py-1 text-sm"
                      >
                        {actionButtonText}
                      </Button>
                    )}
                    
                    {/* Luego los botones de acciones adicionales */}
                    {actions.map((action, i) => (
                      <Button 
                        key={`action-${i}`}
                        onClick={() => action.onClick(row)}
                        className={`${getButtonBgClass(action.variant)} ${getButtonTextClass(action.variant)} rounded-md px-3 py-1 text-sm flex items-center`}
                      >
                        {action.icon && <span className="mr-1">{action.icon}</span>}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Vista móvil - filas como tarjetas */}
      <div className="md:hidden">
        <div className="px-4 py-3 bg-white">
          {paginatedData.map((row, index) => renderMobileRow(row, index))}
        </div>
      </div>

      {/* Paginación - ajustada para móviles */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 bg-white border-t gap-3">
          <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Mostrando <span className="font-medium">{startIndex + 1}</span> a{" "}
            <span className="font-medium">
              {Math.min(startIndex + rowsPerPage, data.length)}
            </span>{" "}
            de <span className="font-medium">{data.length}</span> resultados
          </div>
          <div className="flex justify-center sm:justify-end space-x-1">
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
                    <React.Fragment key={`gap-${page}`}>
                      <span className="px-2 py-1 text-gray-500">...</span>
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
      )}
    </div>
  );
}