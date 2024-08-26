"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPermission = exports.PERMISSION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSION_KEY = 'permissions';
const GetPermission = (...permissions) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, permissions);
exports.GetPermission = GetPermission;
//# sourceMappingURL=permission.decorator.js.map