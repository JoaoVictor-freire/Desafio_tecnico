export interface RegisterPayload {
    Name: string;
    Email: string;
    Password: string;
}

export interface LoginPayload {
    Email: string;
    Password: string;
}

export interface AuthTokenResponse {
    access_token: string;
}

export interface AuthUser {
    userId: number;
    userEmail: string;
}
