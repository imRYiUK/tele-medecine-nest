export interface JwtPayload {
  sub: string;      // utilisateurID
  email: string;
  role: string;
  etaId?: string;   // etablissementID (optional)
  iat?: number;     // issued at
  exp?: number;     // expiration
}
