"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var grid_component_1 = require("./component/grid.component");
var data_column_directive_1 = require("./directive/data-column.directive");
var column_filter_directive_1 = require("./directive/column-filter.directive");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var checkbox_grid_component_1 = require("./component/checkbox-grid.component");
var grid_cell_directive_1 = require("./directive/grid-cell-directive");
var hierarchical_grid_component_1 = require("./component/hierarchical-grid.component");
var search_1 = require("./service/search");
var GridModule = /** @class */ (function () {
    function GridModule() {
    }
    GridModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ng_bootstrap_1.NgbModule,
            ],
            declarations: [
                grid_component_1.GridComponent,
                data_column_directive_1.DataTableColumnDirective,
                column_filter_directive_1.ColumnFilterDirective,
                checkbox_grid_component_1.CheckboxGridComponent,
                grid_cell_directive_1.GridCellDirective,
                hierarchical_grid_component_1.HierarchicalGridComponent,
            ],
            providers: [
                search_1.SearchService
            ],
            exports: [
                grid_component_1.GridComponent,
                data_column_directive_1.DataTableColumnDirective
            ]
        })
    ], GridModule);
    return GridModule;
}());
exports.GridModule = GridModule;
//# sourceMappingURL=grid.module.js.map