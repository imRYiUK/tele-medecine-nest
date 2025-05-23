"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["DOCTOR"] = "doctor";
    UserRole["RADIOLOGIST"] = "radiologist";
    UserRole["PATIENT"] = "patient";
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