// src/components/molecules/MajorDetailsModal.tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/ui/dialog";
import { Major } from "@/types/majorType";
import { Building, GraduationCap, Target } from "lucide-react";

// Imágenes genéricas de carreras (mismo array que en CareerCard)
const careerImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092795442-62d25b2b5e4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
];

// Función para obtener una imagen basada en ID
const getCareerImage = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % careerImages.length;
  return careerImages[index];
};

interface MajorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  major: Major | null;
}

export function MajorDetailsModal({
  isOpen,
  onClose,
  major
}: MajorDetailsModalProps) {
  // Si no hay una carrera seleccionada, no mostrar el modal
  if (!major) return null;

  // Obtener imagen basada en ID
  const imageUrl = getCareerImage(major._id || major.id || "1");

  // Formatear el precio
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(major.price);

  // Traducir dificultad
  const difficultyText = {
    EASY: "Fácil",
    MEDIUM: "Media",
    HARD: "Difícil"
  }[major.difficulty];

  // Colores por dificultad
  const difficultyColor = {
    EASY: "text-green-600",
    MEDIUM: "text-yellow-600",
    HARD: "text-red-600"
  }[major.difficulty];

  // Datos ficticios adicionales para el detalle
  const majorDetails = {
    modality: "Presencial",
    accreditation: "Acreditación de Alta Calidad",
    skills: [
      "Redacción y Escritura",
      "Comunicación Digital",
      "Manejo de Redes Sociales",
      "Producción Audiovisual",
      "Investigación Periodística"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {major.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {major.focus} • {majorDetails.accreditation}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Imagen destacada */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={major.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Información principal */}
          <div className="w-full">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="font-semibold text-gray-800">Información del Programa</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Modalidad:</span>
                  <span className="font-medium">{majorDetails.modality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dificultad:</span>
                  <span className={`font-medium ${difficultyColor}`}>{difficultyText}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio semestral:</span>
                  <span className="font-medium">{formattedPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enfoque:</span>
                  <span className="font-medium">{major.focus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción del programa */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-600 mr-2" />
              Descripción del Programa
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {major.description}
            </p>
          </div>

          {/* Habilidades que desarrollarás */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Target className="h-4 w-4 text-blue-600 mr-2" />
              Habilidades que Desarrollarás
            </h3>
            <div className="flex flex-wrap gap-2">
              {majorDetails.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}