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
    name: string;
    avatar: string;
}

export interface AuthUser {
    userId: number;
    userEmail: string;
    userName: string;
    userAvatar: string;
}

export interface UpdateUserPayload {
    Name?: string;
    Password?: string;
    Avatar?: string;
}
