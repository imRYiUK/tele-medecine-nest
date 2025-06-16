export interface JwtPayload {
  sub: string;      // utilisateurID
  email: string;
  role: string;
  iat?: number;     // issued at
  exp?: number;     // expiration
}
