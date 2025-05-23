export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  RADIOLOGIST = 'radiologist',
  PATIENT = 'patient',
}

export class User {
  id: number;
  email: string;
  password: string;
  roles: UserRole[];
  isActive: boolean;
  failedLoginAttempts: number;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
