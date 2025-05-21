import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts"
import { Skeleton } from "@/components/atoms/ui/skeleton"

interface Props {
  distribution: Record<"1" | "2" | "3" | "4" | "5", number>
  loading?: boolean
}

const COLORS = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6"]

export function QuestionBarChartComponent({ distribution, loading }: Props) {
  if (loading) return <Skeleton className="h-40 w-full" />

  const data = Object.entries(distribution).map(([k, v]) => ({
    opcion: k,
    cantidad: v,
  }))

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="opcion" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="cantidad" fill="#3B82F6">
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
