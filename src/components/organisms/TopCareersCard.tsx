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

// Imágenes genéricas de carreras - usando placeholders para asegurar que carguen
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

// Función mejorada para obtener una imagen basada en el índice
const getCareerImage = (index: number): string => {
  return careerImages[index % careerImages.length];
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

type Career = {
  name: string;
  icon?: string;
  color: string;
}

type TopCareersCardProps = {
  careers: Career[]
}

export function TopCareersCard({ careers }: TopCareersCardProps) {
  return (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <CardTitle className="text-2xl font-bold text-center">
          🏆 TOP 3 Carreras Recomendadas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careers.map((career, index) => {
            const Icon = iconMap[career.name] || Monitor;
            const imageUrl = getCareerImage(index);
            const colorClass = colorClasses[career.color] || "bg-gray-100 text-gray-800";
            
            return (
              <Card
                key={`${career.name}-${index}`}
                className="h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group hover:scale-105"
              >
                {/* Imagen de cabecera */}
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={career.name}
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
                        {career.name}
                      </CardTitle>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  {/* Badge con el color de la carrera */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                      #{index + 1} Recomendada
                    </span>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-gray-500 text-sm text-center">
                    Carrera seleccionada especialmente para tu perfil académico e intereses personales.
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Mensaje si no hay carreras */}
        {careers.length === 0 && (
          <div className="text-center py-8">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay carreras recomendadas disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}