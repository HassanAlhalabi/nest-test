"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFilter = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../types");
exports.ListFilter = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const acceptLanguage = request.headers['accept-language'];
    const filter = {
        ...query,
        acceptLanguage,
    };
    const filterObject = (0, class_transformer_1.plainToClass)(types_1.BaseFilter, filter);
    try {
        await (0, class_validator_1.validateOrReject)(filterObject);
    }
    catch (errors) {
        console.error('Validation failed:', errors);
        throw new Error('Validation failed');
    }
    return filter;
});
//# sourceMappingURL=list-filter.decorator.js.map