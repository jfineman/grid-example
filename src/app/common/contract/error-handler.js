"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var result_service_1 = require("../service/result.service");
var MyErrorHandler = /** @class */ (function () {
    function MyErrorHandler(_resultService) {
        this._resultService = _resultService;
    }
    MyErrorHandler.prototype.handleError = function (error) {
        this._resultService.errorObs.next(error);
        setTimeout(function () { return $(document).click(); }); //hack to trigger change detection in the app
        throw error;
    };
    MyErrorHandler = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [result_service_1.ResultService])
    ], MyErrorHandler);
    return MyErrorHandler;
}());
exports.MyErrorHandler = MyErrorHandler;
//# sourceMappingURL=error-handler.js.map