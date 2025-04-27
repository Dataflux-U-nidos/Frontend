export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginResponse {
    userType: string;
    accessToken: string;
    refreshToken: string;
}

