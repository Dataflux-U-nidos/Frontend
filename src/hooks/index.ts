// src/hooks/index.ts
export * from './user/useCreateUserHook';
export * from './user/useDeleteUserHook';
export * from './user/useUpdateUserHook';
export * from './user/useGetUserByIdHook';
export * from './user/useGetAllUsersHook';
export * from './user/useRegisterUserHook';
export * from './user/useUpdateUserByEmailHook';
export * from './user/useGetStudentsByTutorHook';
export * from './user/useGetViewersByUniversityHook';
export * from './user/useGetManagersByUniversityHook';
export * from './user/useGetSupportByAdminHook';
export * from './user/useGetFinanceByAdminHook';
export * from './user/useGetMarketingByAdminHook';

// Campaign hooks
export * from './campaign/useCreateCampaignHook';
export * from './campaign/useGetAllCampaignsHook';
export * from './campaign/useGetCampaignsByUserHook';
export * from './campaign/useGetCampaignByIdHook';
export * from './campaign/useUpdateCampaignHook';
export * from './campaign/useDeleteCampaignHook';
export * from './campaign/useGetTotalInvestmentHook';