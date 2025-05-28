// src/components/molecules/UniversityGrid.tsx
import { University } from "@/types/universityType";
import { UniversityCard } from "./UniversityCard";

interface UniversityGridProps {
  universities: University[];
  onSelectUniversity: (university: University) => void;
  isLoading?: boolean;
}

export function UniversityGrid({
  universities,
  onSelectUniversity,
  isLoading = false
}: UniversityGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 animate-pulse h-64 rounded-lg p-6"
          />
        ))}
      </div>
    );
  }

  if (universities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-orange-50 p-4 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v12"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No encontramos resultados
        </h3>
        <p className="text-gray-600 max-w-md">
          No hay universidades que coincidan con tu búsqueda. Intenta con otros filtros o términos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universities.map((university) => (
        <UniversityCard
          key={university._id || university.id}
          university={university}
          onClick={() => onSelectUniversity(university)}
        />
      ))}
    </div>
  );
}