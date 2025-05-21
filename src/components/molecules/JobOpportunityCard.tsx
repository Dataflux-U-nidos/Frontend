// src/components/molecules/JobOpportunityCard.tsx
import { JobOpportunity } from "@/types/jobOpportunityType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/atoms/ui/card";
import { DollarSign, BriefcaseBusiness } from "lucide-react";

// Imágenes genéricas para trabajos con temática profesional
const jobImages = [
  "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
];

// Función para obtener una imagen basada en ID
const getJobImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % jobImages.length;
  return jobImages[index];
};

interface JobOpportunityCardProps {
  jobOpportunity: JobOpportunity;
  onClick?: () => void;
}

export function JobOpportunityCard({ jobOpportunity, onClick }: JobOpportunityCardProps) {
  // Formato de moneda para mostrar el salario
  const formattedSalary = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(jobOpportunity.salary);

  // Obtener imagen basada en ID
  const imageUrl = getJobImage(jobOpportunity._id || jobOpportunity.id || "1");

  return (
    <Card
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Imagen de cabecera */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={jobOpportunity.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
              {jobOpportunity.name}
            </CardTitle>
          </div>
          <div className="p-2 bg-orange-100 rounded-full">
            <BriefcaseBusiness className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Descripción */}
        <CardDescription className="text-gray-600 mb-3 text-sm line-clamp-3">
          {jobOpportunity.description}
        </CardDescription>

        {/* Información de salario */}
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{formattedSalary} / año</span>
        </div>
      </CardContent>
    </Card>
  );
}