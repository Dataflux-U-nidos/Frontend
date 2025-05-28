// src/components/molecules/UniversityCard.tsx
import { University } from "@/types/universityType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/atoms/ui/card";
import { MapPin, Building, GraduationCap } from "lucide-react";

// Imágenes genéricas de universidades
const universityImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1574437465443-8fb6e66b7af7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1496418435643-cf8529eca65e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=600&fit=crop"
];

// Función para obtener una imagen basada en el ID de la universidad
const getUniversityImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % universityImages.length;
  return universityImages[index];
};

interface UniversityCardProps {
  university: University;
  onClick?: () => void;
}

export function UniversityCard({ university, onClick }: UniversityCardProps) {
  // Obtener imagen basada en ID
  const imageUrl = getUniversityImage(university._id || university.id || "1");

  // Formatear la información de ubicación
  const locationInfo = [university.zone, university.locality].filter(Boolean).join(', ');

  return (
    <Card
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Imagen de cabecera */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
              {university.name}
            </CardTitle>
          </div>
          <div className="p-2 bg-orange-100 rounded-full">
            <GraduationCap className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Información de ubicación */}
        {locationInfo && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{locationInfo}</span>
          </div>
        )}

        {/* Dirección */}
        <div className="flex items-start text-gray-600 mb-3">
          <Building className="h-4 w-4 mr-2 mt-0.5" />
          <span className="text-sm">{university.address}</span>
        </div>

        {/* Email institucional */}
        <CardDescription className="text-gray-500 text-sm">
          {university.email}
        </CardDescription>
      </CardContent>
    </Card>
  );
}