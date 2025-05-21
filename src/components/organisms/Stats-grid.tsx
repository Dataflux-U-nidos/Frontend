import { StatsCard } from "@/components/molecules/Stats-card"
import { StatsCardProps } from "@/types/statsTypes"

export interface StatsGridProps {
  cards: StatsCardProps[]
  loading?: boolean
  gridClassName?: string
}

export function StatsGrid({
  cards,
  loading,
  gridClassName = "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
}: StatsGridProps) {
  // Si solo hay una tarjeta, centrarla y aplicarle un ancho definido
  if (cards.length === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-1/2 max-w-xs">
          <StatsCard loading={loading} {...cards[0]} />
        </div>
      </div>
    )
  }

  return (
    <div className={gridClassName}>
      {cards.map((card, i) => (
        <StatsCard key={`${card.title}-${i}`} loading={loading} {...card} />
      ))}
    </div>
  )
}
