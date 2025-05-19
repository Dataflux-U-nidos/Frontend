import { userApi } from "@/lib/api/userApi"
import type { PlatformStatsDto, SurveyStatsDto } from "@/types/statsTypes"

export const getPlatformStats = async () =>
    (await userApi.get<PlatformStatsDto>("/user/platform-stats")).data

export const getSurveyStats = async () =>
    (await userApi.get<SurveyStatsDto>("/satisfaction-survey/stats")).data
