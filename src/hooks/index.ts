// src/hooks/index.ts
export * from "./user/useCreateUserHook";
export * from "./user/useDeleteUserHook";
export * from "./user/useUpdateUserHook";
export * from "./user/useGetUserByIdHook";
export * from "./user/useGetAllUsersHook";
export * from "./user/useRegisterUserHook";
export * from "./user/useUpdateUserByEmailHook";
export * from "./user/useGetStudentsByTutorHook";
export * from "./user/useGetViewersByUniversityHook";
export * from "./user/useGetManagersByUniversityHook";
export * from "./user/useGetSupportByAdminHook";
export * from "./user/useGetFinanceByAdminHook";
export * from "./user/useGetMarketingByAdminHook";
export * from "./user/useGetMyUserHook";
export * from "./user/useUpdateMyUserHook";
export * from "./user/useSupportHook";
export * from "./user/useSpoofHook";


// Campaign hooks
export * from "./campaign/useCreateCampaignHook";
export * from "./campaign/useGetAllCampaignsHook";
export * from "./campaign/useGetCampaignsByUserHook";
export * from "./campaign/useGetCampaignByIdHook";
export * from "./campaign/useUpdateCampaignHook";
export * from "./campaign/useDeleteCampaignHook";
export * from "./campaign/useGetTotalInvestmentHook";

//fot studentTests
export * from "./studentTests/useGetVocationalTestHook";
export * from "./studentTests/useUpdateGradesHooks";
export * from "./studentTests/useUpdateTestResultsHook";
export * from './studentTests/useGetSatisfactionTestHook';

// Major hooks
export * from "./major/useGetAllMajorsHook";
export * from "./major/useGetMajorByIdHook";
export * from "./major/useGetMajorsByInstitutionHook";
export * from "./major/useFilterMajorsHook";
export * from "./major/useCreateMajorHook";
export * from "./major/useUpdateMajorHook";
export * from "./major/useDeleteMajorHook";

// Subscription hooks
export * from "./subscription/useGetAllSubscriptionHook";
export * from "./subscription/useUpdateSubscriptionHook";

// Job Opportunity hooks
export * from "./jobOpportunity/useGetAllJobOpportunitiesHook";
export * from "./jobOpportunity/useGetJobOpportunityByIdHook";
export * from "./jobOpportunity/useGetJobOpportunitiesByMajorHook";
export * from "./jobOpportunity/useFilterJobOpportunitiesHook";
export * from "./jobOpportunity/useGetJobOpportunityByIdHook";
export * from "./jobOpportunity/useGetJobOpportunitiesByMajorHook";
export * from "./jobOpportunity/useFilterJobOpportunitiesHook";
export * from "./jobOpportunity/useJobOpportunitiesWithMajorFilterHook";

// University hooks
export * from './university/useGetAllUniversitiesHook';
export * from './university/useGetUniversityByIdHook';
export * from './university/useFilterUniversitiesHook';
export * from "./user/useUpdateUniversityHook";