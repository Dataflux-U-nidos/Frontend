import { useQuery } from "@tanstack/react-query"
import { getSurveyStats } from "@/services/adminService"
import { QUERY_KEYS, DEFAULT_QUERY_OPTIONS } from "@/lib/api/constants"
import type { SurveyStatsDto } from "@/types/statsTypes"

export const useGetSurveyStats = () =>
    useQuery<SurveyStatsDto, Error>({
        queryKey: [QUERY_KEYS.SURVEY_STATS],
        queryFn: getSurveyStats,
        ...DEFAULT_QUERY_OPTIONS,
    })