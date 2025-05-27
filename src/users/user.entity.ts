export class Role {
  id: number;
  name: string;
  description?: string;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  userId: string;
  nom: string;
  prenom: string;
  username?: string;
  password?: string;
  dateNaissance?: Date;
  genre?: string;
  telephone?: string;
  email?: string;
  assuranceMaladie?: string;
  groupeSanguin?: string;
  etablissementID?: string;
  roleId: number;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  isSynced: boolean;
}
