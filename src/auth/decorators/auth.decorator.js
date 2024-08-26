"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
var common_1 = require("@nestjs/common");
var permission_decorator_1 = require("./permission.decorator");
var guards_1 = require("../guards");
function Auth() {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return permissions.length > 0 ? (0, common_1.applyDecorators)(permission_decorator_1.GetPermission.apply(void 0, permissions), (0, common_1.UseGuards)(guards_1.JWTGuard, guards_1.PermissionGuard)) : (0, common_1.UseGuards)(guards_1.JWTGuard);
}
