import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../atoms/ui/card"
import { Brain, Trophy, BarChart } from "lucide-react"

type PersonalityTrait = {
  trait: string
  value: number
  color: string
}

type PersonalityCardProps = {
  personality: PersonalityTrait[]
}

export function PersonalityCard({ personality }: Readonly<PersonalityCardProps>) {
  // Debug: Log para ver qué llega al componente
  console.log('PersonalityCard received:', personality);

  const getTextColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "text-blue-500",
      green: "text-green-500",
      red: "text-red-500",
      orange: "text-orange-500",
      purple: "text-purple-500",
      pink: "text-pink-500",
      teal: "text-teal-500"
    };
    return colorMap[color] || "text-gray-500";
  };

  const getBarColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
      teal: "bg-teal-500"
    };
    return colorMap[color] || "bg-gray-500";
  };

  const getBgColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-50",
      green: "bg-green-50",
      red: "bg-red-50",
      orange: "bg-orange-50",
      purple: "bg-purple-50",
      pink: "bg-pink-50",
      teal: "bg-teal-50"
    };
    return colorMap[color] || "bg-gray-50";
  };

  // Validar que personality existe y tiene elementos válidos
  const validPersonality = personality || [];
  const sortedPersonality = validPersonality
    .filter(trait => trait && trait.value !== null && trait.value !== undefined)
    .sort((a, b) => b.value - a.value);

  return (
    <Card className="bg-gray-50 shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Competencias Académicas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {sortedPersonality.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPersonality.map(({ trait, value, color }, index) => (
              <div
                key={trait}
                className={`${getBgColor(color)} rounded-xl shadow-sm p-6 text-center flex flex-col items-center justify-center hover:shadow-md transition-shadow`}
              >
                {/* Ícono de ranking para los primeros 3 */}
                {index < 3 && (
                  <div className="mb-2">
                    <Trophy className={`h-5 w-5 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' : 
                      'text-amber-600'
                    }`} />
                  </div>
                )}
                
                {/* Valor porcentual */}
                <p className={`text-4xl font-bold ${getTextColor(color)} mb-2`}>
                  {value}%
                </p>
                
                {/* Nombre de la competencia */}
                <p className="text-gray-700 font-medium mb-3 text-sm">
                  {trait}
                </p>
                
                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${getBarColor(color)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Estado vacío para cuando no hay competencias
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <BarChart className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              Competencias no disponibles
            </h3>
            
            <p className="text-gray-500 max-w-md mx-auto">
              Aún no tenemos información sobre tus competencias académicas. 
              Completa las evaluaciones correspondientes para ver tus fortalezas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}