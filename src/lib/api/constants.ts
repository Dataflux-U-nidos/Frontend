export const QUERY_KEYS = {
    USERS: 'users',
    STATSADMIN: 'stats',
    SURVEY_STATS: 'survey-stats',
    PLATFORM_STATS: 'platform-stats',
};

export const DEFAULT_QUERY_OPTIONS = {
    staleTime: 1000 * 60 * 5,       // 5 minutos
    refetchOnMount: false,         // no refetch al montar
    refetchOnWindowFocus: false,   // ni al enfocar ventana
};