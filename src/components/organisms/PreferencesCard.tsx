import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../atoms/ui/card"
import { 
  Brush, 
  Dumbbell, 
  Lightbulb, 
  Palette, 
  Shapes, 
  Music, 
  Film, 
  Book,
  Code
} from "lucide-react"

const iconMap: Record<string, React.FC<any>> = {
  Brush,
  Dumbbell,
  Lightbulb,
  Palette,
  Shapes,
  Music,
  Film,
  Book,
  Code
}

type Preference = {
  label: string;
  icon: string; 
  color: string;
}

type PreferencesCardProps = {
  preferences: Preference[]
}

export function PreferencesCard({ preferences }: PreferencesCardProps) {
  return (
    <Card className="bg-amber-50 shadow-md border-0 rounded-2xl overflow-hidden h-full">
      <CardHeader className="bg-white pb-4">
        <CardTitle className="text-2xl font-bold">Preferencias</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        {preferences.map(({ label, icon, color }) => {
          const Icon = iconMap[icon] || (() => <div className="w-6 h-6 bg-gray-200 rounded-full" />);
          
          return (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-500`} />
              </div>
              <span className="text-gray-700 font-medium">{label}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}