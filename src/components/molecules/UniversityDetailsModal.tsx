// src/components/molecules/UniversityDetailsModal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { University } from "@/types/universityType";
import { MapPin, Mail, Building, GraduationCap, Settings, Phone, Globe } from "lucide-react";

// Imágenes genéricas de universidades (mismo array que en UniversityCard)
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

// Función para obtener una imagen basada en ID
const getUniversityImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % universityImages.length;
  return universityImages[index];
};

interface UniversityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  university: University | null;
}

export function UniversityDetailsModal({
  isOpen,
  onClose,
  university
}: UniversityDetailsModalProps) {
  // Si no hay una universidad seleccionada, no mostrar el modal
  if (!university) return null;

  // Obtener imagen basada en ID
  const imageUrl = getUniversityImage(university._id || university.id || "1");

  // Formatear la información de ubicación
  const locationInfo = [university.zone, university.locality].filter(Boolean).join(', ');

  // Datos ficticios adicionales para el detalle
  const universityDetails = {
    founded: "1623",
    website: "www.universidad.edu.co",
    phone: "+57 1 320 8320",
    campuses: 3,
    accreditation: "Acreditación de Alta Calidad",
    ranking: "#2 en Colombia",
    programs: [
      "Ingenierías",
      "Ciencias de la Salud", 
      "Ciencias Sociales",
      "Artes y Humanidades",
      "Ciencias Económicas"
    ],
    description: `Una institución de educación superior reconocida por su excelencia académica y su compromiso con la formación integral de profesionales competentes y ciudadanos responsables. Con más de 400 años de trayectoria, se destaca por su investigación de alta calidad y su contribución al desarrollo del país.`
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {university.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {locationInfo && `${locationInfo} • `}
            {universityDetails.accreditation}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Imagen destacada */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={university.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información principal en cards */}
          <div className="w-full">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Información General</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fundada:</span>
                  <span className="font-medium">{universityDetails.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ranking:</span>
                  <span className="font-medium">{universityDetails.ranking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Campus:</span>
                  <span className="font-medium">{universityDetails.campuses} sedes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Settings className="h-4 w-4 text-gray-600 mr-2" />
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Dirección</p>
                  <p className="text-gray-700 text-sm">{university.address}</p>
                  {locationInfo && (
                    <p className="text-gray-500 text-xs">{locationInfo}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Email institucional</p>
                  <p className="text-gray-700 text-sm">{university.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Sitio web</p>
                  <p className="text-blue-600 text-sm hover:underline cursor-pointer">
                    {universityDetails.website}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Teléfono</p>
                  <p className="text-gray-700 text-sm">{universityDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-600 mr-2" />
              Acerca de la Universidad
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {universityDetails.description}
            </p>
          </div>

          {/* Áreas de estudio */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Building className="h-4 w-4 text-green-600 mr-2" />
              Áreas de Estudio
            </h3>
            <div className="flex flex-wrap gap-2">
              {universityDetails.programs.map((program) => (
                <span 
                  key={program} 
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                >
                  {program}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Oferta académica amplia con programas de pregrado y posgrado
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}