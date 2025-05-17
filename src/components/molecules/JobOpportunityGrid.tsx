import { JobOpportunity } from "@/types/jobOpportunityType";
import { JobOpportunityCard } from "./JobOpportunityCard";

interface JobOpportunityGridProps {
  jobOpportunities: JobOpportunity[];
  onSelectJobOpportunity: (jobOpportunity: JobOpportunity) => void;
  isLoading?: boolean;
}

export function JobOpportunityGrid({
  jobOpportunities,
  onSelectJobOpportunity,
  isLoading = false
}: JobOpportunityGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 animate-pulse h-48 rounded-lg p-6"
          />
        ))}
      </div>
    );
  }

  if (jobOpportunities.length === 0) {
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16c1.864 0 3.556-.78 4.728-2a7.97 7.97 0 002.182-4.5M12 16c-1.864 0-3.556-.78-4.728-2a7.97 7.97 0 01-2.182-4.5M12 2a10 10 0 1010 10A10 10 0 0012 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No encontramos resultados
        </h3>
        <p className="text-gray-600 max-w-md">
          No hay salidas laborales que coincidan con tu búsqueda. Intenta con otros filtros o términos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobOpportunities.map((jobOpportunity) => (
        <JobOpportunityCard
          key={jobOpportunity._id || jobOpportunity.id}
          jobOpportunity={jobOpportunity}
          onClick={() => onSelectJobOpportunity(jobOpportunity)}
        />
      ))}
    </div>
  );
}