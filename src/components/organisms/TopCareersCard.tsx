import { useState } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../atoms/ui/card"
import {
  Laptop,
  ClipboardList,
  Megaphone,
  Scale,
  Stethoscope,
  Factory,
  Brain,
  Home,
  Building,
  Calculator,
  Heart,
  Code,
  Radio,
  Landmark,
  TrendingUp,
  Construction,
  Smile,
  Leaf,
  GraduationCap,
  Users,
  Dog,
  Paintbrush,
  TrendingUp as Marketing,
  Globe,
  Monitor
} from "lucide-react"
import { UniversityRecommendationModal } from "@/components/organisms/UniversityRecommendationModal";
import type { RecommendationWithUniversity } from "@/types/recomendationType";

// Imágenes genéricas de carreras
const careerImages = [
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
];

const iconMap: Record<string, React.FC<any>> = {
  // Iconos originales
  Laptop,
  ClipboardList,
  Megaphone,
  // Iconos para carreras específicas
  Derecho: Scale,
  Medicina: Stethoscope,
  "Ingeniería Industrial": Factory,
  Psicología: Brain,
  Arquitectura: Home,
  "Administración de Empresas": Building,
  "Contaduría Pública": Calculator,
  Enfermería: Heart,
  "Ingeniería de Sistemas": Code,
  "Comunicación Social": Radio,
  "Ciencias Políticas": Landmark,
  Economía: TrendingUp,
  "Ingeniería Civil": Construction,
  Odontología: Smile,
  Biología: Leaf,
  Educación: GraduationCap,
  "Trabajo Social": Users,
  Veterinaria: Dog,
  "Diseño Gráfico": Paintbrush,
  Marketing: Marketing,
  "Relaciones Internacionales": Globe
}

// Función para obtener una imagen basada en ID
const getCareerImageById = (id: string): string => {
  const numericId = parseInt(id.replace(/[^0-9]/g, ''), 10) || 0;
  const index = numericId % careerImages.length;
  return careerImages[index];
};

// Colores disponibles para las carreras
const colorClasses: Record<string, string> = {
  indigo: "bg-indigo-100 text-indigo-800",
  green: "bg-green-100 text-green-800", 
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  yellow: "bg-yellow-100 text-yellow-800",
  pink: "bg-pink-100 text-pink-800",
};

type TopCareersCardProps = {
  careers: RecommendationWithUniversity[]
}

export function TopCareersCard({ careers }: TopCareersCardProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationWithUniversity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCareerClick = (recommendation: RecommendationWithUniversity) => {
    setSelectedRecommendation(recommendation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecommendation(null);
  };

  return (
    <>
      <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">
            🏆 TOP 3 Carreras Recomendadas
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careers.map((recommendation, index) => {
              const Icon = iconMap[recommendation.name] || Monitor;
              const imageUrl = getCareerImageById(recommendation._id);
              const colorClass = colorClasses[recommendation.color || 'blue'] || "bg-gray-100 text-gray-800";
              
              return (
                <Card
                  key={recommendation._id}
                  className="h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-105"
                  onClick={() => handleCareerClick(recommendation)}
                >
                  {/* Imagen de cabecera */}
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={recommendation.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback si la imagen no carga
                        const target = e.target as HTMLImageElement;
                        target.src = "/api/placeholder/800/600";
                      }}
                    />
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                          {recommendation.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{recommendation.university.name}</p>
                      </div>
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Icon className="h-5 w-5 text-orange-500" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    {/* Badge con el ranking */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                        #{index + 1} Recomendada
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {recommendation.university.zone}
                      </span>
                    </div>
                    
                    {/* Información básica */}
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Precio:</span>
                        <span className="font-medium text-green-600">
                          {new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0,
                          }).format(recommendation.price)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Dificultad:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          recommendation.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                          recommendation.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recommendation.difficulty === 'EASY' ? 'Fácil' : 
                           recommendation.difficulty === 'MEDIUM' ? 'Moderada' : 'Difícil'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-gray-500 text-sm text-center mb-3 line-clamp-2">
                      {recommendation.description}
                    </p>
                    
                    {/* Competencias relacionadas */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recommendation.preferences.slice(0, 2).map((pref, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                        >
                          {pref.toUpperCase()}
                        </span>
                      ))}
                      {recommendation.preferences.length > 2 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">
                          +{recommendation.preferences.length - 2}
                        </span>
                      )}
                    </div>
                    
                    {/* Indicador de click */}
                    <div className="mt-3 text-center">
                      <span className="text-xs text-orange-600 font-medium">
                        👆 Click para ver detalles
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {/* Mensaje si no hay carreras */}
          {careers.length === 0 && (
            <div className="text-center py-12">
              <div className="relative">
                {/* Ilustración de fondo decorativa */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
                </div>
                
                {/* Contenido principal */}
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-12 w-12 text-orange-500" />
                      </div>
                      {/* Puntitos decorativos */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    ¡Estamos trabajando en tus recomendaciones! 
                  </h3>
                  
                  <p className="text-gray-500 mb-4 max-w-md mx-auto leading-relaxed">
                    Aún no tenemos suficiente información para sugerirte las mejores carreras. 
                    Completa tu perfil para recibir recomendaciones personalizadas.
                  </p>
                  
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                      Analizando intereses
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      Evaluando aptitudes
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" style={{animationDelay: '1s'}}></div>
                      Generando sugerencias
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modal de detalles de universidad */}
      <UniversityRecommendationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recommendation={selectedRecommendation}
      />
    </>
  )
}