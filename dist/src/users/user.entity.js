"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
class Role {
    id;
    name;
    description;
    users;
    createdAt;
    updatedAt;
}
exports.Role = Role;
class User {
    userId;
    nom;
    prenom;
    username;
    password;
    dateNaissance;
    genre;
    telephone;
    email;
    assuranceMaladie;
    groupeSanguin;
    etablissementID;
    roleId;
    role;
    createdAt;
    updatedAt;
    isSynced;
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map