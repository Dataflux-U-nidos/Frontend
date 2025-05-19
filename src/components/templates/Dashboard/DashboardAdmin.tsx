import { StatsGrid } from "@/components/organisms/Stats-grid"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/atoms/ui/tabs"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/atoms/ui/card"
import { PieChartComponent } from "@/components/molecules/graphics/Pie-Chart"
import { QuestionBarChartComponent } from "@/components/molecules/graphics/QuestionBarChartComponent"
import { RecentRegistrationsTable } from "@/components/organisms/RecentRegistrationsTable"

import type { PieSlice, StatsCardProps, SurveyStatsDto } from "@/types/statsTypes"
import type { PlatformStatsDto } from "@/types/statsTypes"

export interface DashboardTemplateProps {
    /* pestaña Uso */
    usageCards: StatsCardProps[]
    pieSeries: PieSlice[]
    recentRows: PlatformStatsDto["recentRegistrations"]

    /* pestaña Encuesta */
    surveyCards: StatsCardProps[]
    questionStats: SurveyStatsDto["questionStats"]

    loading?: boolean
}

export default function DashboardTemplate({
    usageCards,
    pieSeries,
    recentRows,
    surveyCards,
    questionStats,
    loading,
}: DashboardTemplateProps) {
    return (
        <section className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <Tabs defaultValue="usage" className="space-y-6">
                <TabsList className="flex flex-wrap gap-2">
                    <TabsTrigger value="usage">Uso de la plataforma</TabsTrigger>
                    <TabsTrigger value="survey">Encuesta de satisfacción</TabsTrigger>
                </TabsList>

                {/* ---------- TAB USO DE LA PLATAFORMA ---------- */}
                <TabsContent value="usage" className="space-y-6">
                    <StatsGrid cards={usageCards} />

                    <div className="grid gap-4 lg:grid-cols-7">
                        {/* Pie suscripciones */}
                        <Card className="col-span-4 lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Tipo de suscripción</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PieChartComponent data={pieSeries} loading={loading} />
                            </CardContent>
                        </Card>

                        {/* Tabla registros */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Registros recientes</CardTitle>
                            </CardHeader>
                            <CardContent className="max-h-72 overflow-y-auto">
                                <RecentRegistrationsTable rows={recentRows} loading={loading} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* ---------- TAB ENCUESTA DE SATISFACCIÓN ---------- */}
                <TabsContent value="survey" className="space-y-6">
                    <StatsGrid cards={surveyCards} />

                    {/* Grid 4-col con un gráfico por pregunta */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {questionStats.map((q) => (
                            <Card key={q.questionIndex}>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">
                                        P{q.questionIndex + 1}
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground">
                                        Prom: {q.average} &nbsp;•&nbsp; Med: {q.median} &nbsp;•&nbsp; Moda:{" "}
                                        {q.mode}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <QuestionBarChartComponent
                                        distribution={q.distribution}
                                        loading={loading}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

            </Tabs>
        </section>
    )
}
