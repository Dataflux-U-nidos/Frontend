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
    Globe
  } from "lucide-react"
  
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
  
  // Mapa de colores para Tailwind
  const colorMap: Record<string, string> = {
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    pink: "text-pink-600",
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    indigo: "text-indigo-600",
  }
  
  type Career = {
    name: string;
    icon?: string;  // Ahora es opcional, se determinará automáticamente si no se proporciona
    color: string;
  }
  
  type TopCareersCardProps = {
    careers: Career[]
  }
  
  export function TopCareersCard({ careers }: TopCareersCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>TOP carreras</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 text-center gap-4">
          {careers.map(({ name, icon, color }) => {
            // Primero busca un icono específico para la carrera, luego busca el icono proporcionado,
            // o usa un fallback si ninguno de los dos existe
            let careerName = name.trim();
            const SpecificIcon = iconMap[careerName] || iconMap[icon || ""] || (() => <div className="w-8 h-8 bg-gray-200 rounded-full" />);
            const colorClass = colorMap[color] || "text-gray-600";
            
            return (
              <div key={name} className="flex flex-col items-center gap-2">
                <SpecificIcon className={`w-8 h-8 ${colorClass}`} />
                <span className="text-sm">{name}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    )
  }