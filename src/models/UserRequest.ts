export default interface UserRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    role: string;
}