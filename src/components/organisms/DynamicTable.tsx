import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
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
    return <p>No hay datos disponibles.</p>;
  }

  const headers = Object.keys(data[0]);
  
  // Traducir encabezados para mostrar en español
  const headerTranslations: Record<string, string> = {
    email: "Correo",
    name: "Nombre",
    age: "Edad",
    school: "Colegio",
    location: "Localidad"
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

  return (
    <div className="rounded-lg overflow-hidden shadow">
      <Table className="w-full">
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader className="bg-gray-50 border-b">
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
            <TableRow 
              key={i} 
              className="bg-peach-50 hover:bg-orange-50 border-b"
            >
              {headers.map(header => (
                <TableCell key={header} className="p-4 text-sm">
                  {header === "age" ? `${row[header]} Años` : row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t">
          <div className="text-sm text-gray-500">
            Mostrando <span className="font-medium">{startIndex + 1}</span> a{" "}
            <span className="font-medium">
              {Math.min(startIndex + rowsPerPage, data.length)}
            </span>{" "}
            de <span className="font-medium">{data.length}</span> resultados
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
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
};