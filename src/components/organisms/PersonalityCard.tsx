
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalidad</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personality.map(({ trait, value, color }) => (
          <div
            key={trait}
            className={`bg-${color}-100 rounded-lg p-4 text-center`}
          >
            <p className={`text-2xl font-bold text-${color}-800`}>{value}%</p>
            <p className="text-sm text-gray-700">{trait}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
