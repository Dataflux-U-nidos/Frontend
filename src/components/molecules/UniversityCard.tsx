// src/components/molecules/UniversityCard.tsx
import { University } from "@/types/universityType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/atoms/ui/card";
import { MapPin, Building, GraduationCap } from "lucide-react";

// Imágenes predefinidas para las universidades
const universityImages = [
  "https://www.javeriana.edu.co/recursosdb/2299859/2364811/padre-munera-500.jpg/93bef083-3877-fdac-8dc3-862978b4ceeb?t=1678772459442",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Universidad_Nacional_de_Colombia_-_Bogot%C3%A1.jpg/1200px-Universidad_Nacional_de_Colombia_-_Bogot%C3%A1.jpg",
  "https://www.uniandes.edu.co/sites/default/files/styles/large/public/2021-05/campus-2.jpg",
  "https://www.ucatolica.edu.co/portal/wp-content/uploads/2019/08/edificio-principal.jpg",
  "https://www.usergioarboleda.edu.co/wp-content/uploads/2020/01/campus-bogota-sede-norte.jpg",
  "https://www.ucentral.edu.co/sites/default/files/2020-02/IMG_20200211_113053.jpg",
  "https://www.ean.edu.co/sites/default/files/noticias/EAN-Virtual.jpg",
  "https://www.udistrital.edu.co/sites/default/files/imagenes/noticias/2019/mayo/IMG_5851.JPG",
  "https://www.unisabana.edu.co/fileadmin/_processed_/0/3/csm_campus-puente-del-comun_1920x846_4b9b45e8b3.jpg",
  "https://www.unbosque.edu.co/sites/default/files/2020-03/campus.jpg"
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

      <CardFooter className="bg-gray-50 pt-3 pb-3 border-t border-gray-100">
        <div className="w-full">
          <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
            Ver más detalles
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}