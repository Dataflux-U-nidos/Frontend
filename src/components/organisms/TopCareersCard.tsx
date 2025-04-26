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
      <Card className="bg-blue-50 shadow-md border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-white pb-4">
          <CardTitle className="text-2xl font-bold">TOP carreras</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {careers.map((career) => {
            const Icon = iconMap[career.name] || Monitor;
            
            return (
              <div key={career.name} className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-gray-700 font-medium text-center">{career.name}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    )
  }