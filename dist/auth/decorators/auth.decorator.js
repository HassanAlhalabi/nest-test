"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const permission_decorator_1 = require("./permission.decorator");
const guards_1 = require("../guards");
function Auth(...permissions) {
    return permissions.length > 0 ? (0, common_1.applyDecorators)((0, permission_decorator_1.GetPermission)(...permissions), (0, common_1.UseGuards)(guards_1.JWTGuard, guards_1.PermissionGuard)) : (0, common_1.UseGuards)(guards_1.JWTGuard);
}
//# sourceMappingURL=auth.decorator.js.map