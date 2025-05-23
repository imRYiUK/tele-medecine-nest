"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMINISTRATEUR"] = "administrateur";
    UserRole["MEDECIN"] = "medecin";
    UserRole["RADIOLOGUE"] = "radiologue";
    UserRole["PERSONNEL_ADMINISTRATIF"] = "personnel_administratif";
})(UserRole || (exports.UserRole = UserRole = {}));
class User {
    id;
    email;
    password;
    roles;
    isActive;
    failedLoginAttempts;
    lastLogin;
    createdAt;
    updatedAt;
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map