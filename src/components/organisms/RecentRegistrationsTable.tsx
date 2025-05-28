// src/components/organisms/RecentRegistrationsTable.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/ui/table"
import { Skeleton } from "@/components/atoms/ui/skeleton"
import { format } from "date-fns"
import type { PlatformStatsDto } from "@/types/statsTypes"

const userTypeLabels: Record<string, string> = {
    STUDENT: "Estudiante",
    UNIVERSITY: "Universidad",
    TUTOR: "Tutor",
    MARKETING: "Marketing",
}

export function RecentRegistrationsTable({
    rows,
    loading,
}: {
    rows: PlatformStatsDto["recentRegistrations"]
    loading?: boolean
}) {
    if (loading) return <Skeleton className="h-48 w-full" />

    if (!rows || rows.length === 0)
        return (
            <p className="text-center text-sm text-muted-foreground">
                Sin registros
            </p>
        )

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Id</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((r) => (
                    <TableRow key={r.userId}>
                        {/* Aquí traducimos el tipo a español */}
                        <TableCell>
                            {userTypeLabels[r.userType] ?? r.userType}
                        </TableCell>
                        <TableCell>
                            {format(new Date(r.createdAt), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="truncate max-w-[120px]">
                            {r.userId}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
