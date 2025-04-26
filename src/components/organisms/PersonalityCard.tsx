import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../atoms/ui/card"

type PersonalityTrait = {
  trait: string
  value: number
  color: string
}

type PersonalityCardProps = {
  personality: PersonalityTrait[]
}

export function PersonalityCard({ personality }: PersonalityCardProps) {
  // Crear mapeos de colores específicos basados en la imagen de referencia
  const getBackgroundColor = (color: string) => {
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

  return (
    <Card className="bg-blue-50 shadow-md border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-white pb-4">
        <CardTitle className="text-2xl font-bold">Personalidad</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 p-6">
        {personality.map(({ trait, value, color }) => (
          <div
            key={trait}
            className="bg-white rounded-xl shadow-sm p-6 text-center flex flex-col items-center justify-center"
          >
            <p className={`text-4xl font-bold ${getTextColor(color)}`}>{value}%</p>
            <p className="text-gray-600 mt-2">{trait}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}