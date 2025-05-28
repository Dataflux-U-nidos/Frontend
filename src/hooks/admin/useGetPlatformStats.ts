import { useQuery } from "@tanstack/react-query"
import { getPlatformStats } from "@/services/adminService"
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from "@/lib/api/constants"
import type { PlatformStatsDto } from "@/types/statsTypes"

export const useGetPlatformStats = () =>
    useQuery<PlatformStatsDto, Error>({
        queryKey: [QUERY_KEYS.PLATFORM_STATS],
        queryFn: getPlatformStats,
        ...DEFAULT_QUERY_OPTIONS,
    })