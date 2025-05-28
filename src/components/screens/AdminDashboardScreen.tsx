import { JSX, useMemo } from "react"
import DashboardTemplate from "@/components/templates/Dashboard/DashboardAdmin"

import { useGetPlatformStats } from "@/hooks/admin/useGetPlatformStats"
import { useGetSurveyStats } from "@/hooks/admin/useGetSurveyStats"

import {
    User2,
    GraduationCap,
    Users,
    CreditCard,
    BarChart2,
} from "lucide-react"

import type { StatsCardProps, PieSlice } from "@/types/statsTypes"
import type { PlatformStatsDto } from "@/types/statsTypes"

export default function DashboardAdminScreen() {
    const { data: platformStats, isLoading: loadingPlatform } =
        useGetPlatformStats()
    const { data: surveyStats, isLoading: loadingSurvey } = useGetSurveyStats()

    const loading = loadingPlatform || loadingSurvey

    /* ---------- Tarjetas uso plataforma ---------- */
    const usageCards: StatsCardProps[] = useMemo(() => {
        if (!platformStats) return []
        const items: Array<{
            title: string
            value: number
            icon: JSX.Element
            description: string
        }> = [
                {
                    title: "Estudiantes",
                    value: platformStats.totalStudents,
                    icon: <User2 className="h-4 w-4 text-primary" />,
                    description: "Cantidad total de estudiantes registrados",
                },
                {
                    title: "Universidades",
                    value: platformStats.totalUniversities,
                    icon: <GraduationCap className="h-4 w-4 text-indigo-500" />,
                    description: "Universidades inscritas en la plataforma",
                },
                {
                    title: "Tutores",
                    value: platformStats.totalTutors,
                    icon: <Users className="h-4 w-4 text-violet-500" />,
                    description: "Tutores activos en el sistema",
                },
                {
                    title: "Suscripciones activas",
                    value: platformStats.activeSubscriptions,
                    icon: <CreditCard className="h-4 w-4 text-emerald-500" />,
                    description: "Planes de pago actualmente vigentes",
                },
            ]

        return items.map(({ title, value, icon, description }) => ({
            title,
            value: value.toLocaleString(),
            icon,
            description,
            loading,
        }))
    }, [platformStats, loading])

    /* ---------- Pie subscriptions ---------- */
    const pieSeries: PieSlice[] = useMemo(() => {
        if (!platformStats) return []
        const d = platformStats.subscriptionDistribution
        return [
            { label: "Bajo", value: d.LOW },
            { label: "Medio", value: d.MEDIUM },
            { label: "Alto", value: d.HIGH },
        ]
    }, [platformStats])

    const recentRows: PlatformStatsDto["recentRegistrations"] =
        platformStats?.recentRegistrations ?? []

    /* ---------- Tarjeta encuesta ---------- */
    const surveyCards: StatsCardProps[] = useMemo(() => {
        if (!surveyStats) return []
        return [
            {
                title: "Encuestados",
                value: surveyStats.totalRespondents.toLocaleString(),
                icon: <BarChart2 className="h-4 w-4 text-primary" />,
                description: "Personas que respondieron la encuesta",
                loading,
            },
        ]
    }, [surveyStats, loading])


    return (
        <DashboardTemplate
            usageCards={usageCards}
            pieSeries={pieSeries}
            recentRows={recentRows}
            surveyCards={surveyCards}
            questionStats={surveyStats?.questionStats ?? []}
            loading={loading}
        />
    )
}
