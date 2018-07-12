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
var grid_component_1 = require("./grid.component");
var GridSearchComponent = /** @class */ (function () {
    function GridSearchComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", grid_component_1.GridComponent)
    ], GridSearchComponent.prototype, "gridComponent", void 0);
    GridSearchComponent = __decorate([
        core_1.Component({
            selector: 'grid-search',
            moduleId: module.id,
            template: "\n          <div *ngIf=\"gridComponent.options.canSearch\" class=\"row form-group\">\n            <div class=\"col-md-6\">\n                <typeahead-menu \n                    name=\"search-column\"                  \n                    [(ngModel)]=\"gridComponent.searchService.searchColumn\" \n                    [data]=\"gridComponent.searchService.columnNamesCombo\"\n                    (onSelectedItem)=\"gridComponent.searchService.onSearchColumnSelect($event)\" >\n                </typeahead-menu>\n            </div>\n        \n            <div class=\"col-md-6\">  \n                <div class=\"input-group\">\n                    <input (keyup)=\"gridComponent.searchService.basicSearch($event)\" name=\"search-term\" [(ngModel)]=\"gridComponent.searchService.searchTerm\" type=\"text\" class=\"form-control\" [style.border-right]=\"'0'\">\n                    <div (click)=\"gridComponent.searchService.basicSearch()\" class=\"input-group-addon\" [style.height.px]=\"'30'\">\n                        <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                    </div>\n                </div>\n            </div>\n        </div> \n    "
        })
    ], GridSearchComponent);
    return GridSearchComponent;
}());
exports.GridSearchComponent = GridSearchComponent;
//# sourceMappingURL=search.component.js.map