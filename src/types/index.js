"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFilter = exports.BaseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var BaseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _isDeleted_decorators;
    var _isDeleted_initializers = [];
    var _isDeleted_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BaseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.createdAt = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                this.isActive = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.isDeleted = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isDeleted_initializers, void 0));
                __runInitializers(this, _isDeleted_extraInitializers);
            }
            return BaseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Item id' })];
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Item name' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'The date the role was created.' })];
            _updatedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'The date the role was last updated.' })];
            _isActive_decorators = [(0, swagger_1.ApiProperty)({ description: 'Item status active/notActive' })];
            _isDeleted_decorators = [(0, swagger_1.ApiProperty)({ description: 'Is item deleted' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: function (obj) { return "isDeleted" in obj; }, get: function (obj) { return obj.isDeleted; }, set: function (obj, value) { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _isDeleted_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BaseDto = BaseDto;
var BaseFilter = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    var _ignorePagination_decorators;
    var _ignorePagination_initializers = [];
    var _ignorePagination_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _isDeleted_decorators;
    var _isDeleted_initializers = [];
    var _isDeleted_extraInitializers = [];
    var _minDate_decorators;
    var _minDate_initializers = [];
    var _minDate_extraInitializers = [];
    var _maxDate_decorators;
    var _maxDate_initializers = [];
    var _maxDate_extraInitializers = [];
    var _orderBy_decorators;
    var _orderBy_initializers = [];
    var _orderBy_extraInitializers = [];
    var _isDesc_decorators;
    var _isDesc_initializers = [];
    var _isDesc_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BaseFilter() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.page = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.pageSize = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageSize_initializers, void 0));
                this.ignorePagination = (__runInitializers(this, _pageSize_extraInitializers), __runInitializers(this, _ignorePagination_initializers, void 0));
                this.search = (__runInitializers(this, _ignorePagination_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.isActive = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                this.isDeleted = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _isDeleted_initializers, void 0));
                this.minDate = (__runInitializers(this, _isDeleted_extraInitializers), __runInitializers(this, _minDate_initializers, void 0));
                this.maxDate = (__runInitializers(this, _minDate_extraInitializers), __runInitializers(this, _maxDate_initializers, void 0));
                this.orderBy = (__runInitializers(this, _maxDate_extraInitializers), __runInitializers(this, _orderBy_initializers, void 0));
                this.isDesc = (__runInitializers(this, _orderBy_extraInitializers), __runInitializers(this, _isDesc_initializers, void 0));
                __runInitializers(this, _isDesc_extraInitializers);
            }
            return BaseFilter;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return parseInt(value, 10);
                })];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return parseInt(value, 10);
                })];
            _pageSize_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return parseInt(value, 10);
                })];
            _ignorePagination_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _search_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _isDeleted_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true' || value === true;
                })];
            _minDate_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _maxDate_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _orderBy_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isDesc_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return value === 'true';
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
            __esDecorate(null, null, _ignorePagination_decorators, { kind: "field", name: "ignorePagination", static: false, private: false, access: { has: function (obj) { return "ignorePagination" in obj; }, get: function (obj) { return obj.ignorePagination; }, set: function (obj, value) { obj.ignorePagination = value; } }, metadata: _metadata }, _ignorePagination_initializers, _ignorePagination_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: function (obj) { return "isDeleted" in obj; }, get: function (obj) { return obj.isDeleted; }, set: function (obj, value) { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _isDeleted_extraInitializers);
            __esDecorate(null, null, _minDate_decorators, { kind: "field", name: "minDate", static: false, private: false, access: { has: function (obj) { return "minDate" in obj; }, get: function (obj) { return obj.minDate; }, set: function (obj, value) { obj.minDate = value; } }, metadata: _metadata }, _minDate_initializers, _minDate_extraInitializers);
            __esDecorate(null, null, _maxDate_decorators, { kind: "field", name: "maxDate", static: false, private: false, access: { has: function (obj) { return "maxDate" in obj; }, get: function (obj) { return obj.maxDate; }, set: function (obj, value) { obj.maxDate = value; } }, metadata: _metadata }, _maxDate_initializers, _maxDate_extraInitializers);
            __esDecorate(null, null, _orderBy_decorators, { kind: "field", name: "orderBy", static: false, private: false, access: { has: function (obj) { return "orderBy" in obj; }, get: function (obj) { return obj.orderBy; }, set: function (obj, value) { obj.orderBy = value; } }, metadata: _metadata }, _orderBy_initializers, _orderBy_extraInitializers);
            __esDecorate(null, null, _isDesc_decorators, { kind: "field", name: "isDesc", static: false, private: false, access: { has: function (obj) { return "isDesc" in obj; }, get: function (obj) { return obj.isDesc; }, set: function (obj, value) { obj.isDesc = value; } }, metadata: _metadata }, _isDesc_initializers, _isDesc_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BaseFilter = BaseFilter;
