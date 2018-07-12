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
var DataTableColumnDirective = /** @class */ (function () {
    function DataTableColumnDirective(_elRef, _viewContainerRef, _componentFactoryResolver) {
        this._elRef = _elRef;
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    DataTableColumnDirective.prototype.ngOnInit = function () {
        if (this.columnContext.column.component)
            this.loadComponent();
    };
    DataTableColumnDirective.prototype.loadComponent = function () {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.columnContext.column.component);
        this._viewContainerRef.clear();
        var componentRef = this._viewContainerRef.createComponent(componentFactory);
        this.component = componentRef.instance;
        this.component.columnContext = this.columnContext;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_context_1.ColumnContext)
    ], DataTableColumnDirective.prototype, "columnContext", void 0);
    DataTableColumnDirective = __decorate([
        core_1.Directive({ selector: '[star-datatable-column]' }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ViewContainerRef, core_1.ComponentFactoryResolver])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;
//# sourceMappingURL=data-column.directive.js.map