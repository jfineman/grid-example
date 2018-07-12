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
var column_context_1 = require("../contract/column-context");
var GridCellDirective = /** @class */ (function () {
    function GridCellDirective(elRef) {
        this.elRef = elRef;
    }
    ;
    Object.defineProperty(GridCellDirective.prototype, "background", {
        get: function () {
            return this.highlighted ? '#ff0' : 'inherit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridCellDirective.prototype, "border", {
        get: function () {
            return this.error;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('star-grid-cell'),
        __metadata("design:type", column_context_1.ColumnContext)
    ], GridCellDirective.prototype, "columnContext", void 0);
    __decorate([
        core_1.HostBinding('style.backgroundColor'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], GridCellDirective.prototype, "background", null);
    __decorate([
        core_1.HostBinding('class.border-red-highlight'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], GridCellDirective.prototype, "border", null);
    GridCellDirective = __decorate([
        core_1.Directive({ selector: '[star-grid-cell]' }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], GridCellDirective);
    return GridCellDirective;
}());
exports.GridCellDirective = GridCellDirective;
//# sourceMappingURL=grid-cell-directive.js.map