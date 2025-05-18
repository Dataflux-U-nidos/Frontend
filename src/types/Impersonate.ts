export interface ImpersonateUserDto {
  targetUserId: string;
}

export interface ImpersonateResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userType: string;
}
