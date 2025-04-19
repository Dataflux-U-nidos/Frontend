import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "../atoms/ui/card"
  import { Brush, Dumbbell, Lightbulb } from "lucide-react"
  
  const iconMap: Record<string, React.FC<any>> = {
    Brush,
    Dumbbell,
    Lightbulb,
    // More As needed
  }
  
  const colorMap: Record<string, string> = {
    orange: "text-orange-500",
    yellow: "text-yellow-500",
    pink: "text-pink-500",
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    red: "text-red-500",
    indigo: "text-indigo-500",
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
      <Card>
        <CardHeader>
          <CardTitle>Preferencias</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-gray-700 text-base">
          {preferences.map(({ label, icon, color }) => {
            // Si el icono existe en el mapa, úsalo; de lo contrario, usa un fallback
            const Icon = iconMap[icon] || (() => <div className="w-5 h-5 bg-gray-200 rounded-full" />);
            const colorClass = colorMap[color] || "text-gray-500";
            
            return (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${colorClass}`} />
                {label}
              </div>
            )
          })}
        </CardContent>
      </Card>
    )
  }