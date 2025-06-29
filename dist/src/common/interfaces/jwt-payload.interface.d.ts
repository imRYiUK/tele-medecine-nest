export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    etaId?: string;
    iat?: number;
    exp?: number;
}
