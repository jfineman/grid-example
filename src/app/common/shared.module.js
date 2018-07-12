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
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/common/http");
var grid_module_1 = require("../grid/grid.module");
var typeahead_menu_component_1 = require("./component/typeahead-menu.component");
var list_group_component_1 = require("./component/list-group.component");
var datepicker_component_1 = require("./component/datepicker.component");
var editor_directive_1 = require("./directive/editor.directive");
var equal_directive_1 = require("./directive/equal.directive");
var search_component_1 = require("../grid/component/search.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                router_1.RouterModule,
                ng_bootstrap_1.NgbModule,
                grid_module_1.GridModule,
                http_1.HttpClientModule,
            ],
            declarations: [
                typeahead_menu_component_1.TypeaheadMenuComponent,
                list_group_component_1.ListGroupComponent,
                datepicker_component_1.Datepicker,
                editor_directive_1.EditorDirective,
                equal_directive_1.Equal,
                search_component_1.GridSearchComponent
            ],
            exports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                router_1.RouterModule,
                ng_bootstrap_1.NgbModule,
                grid_module_1.GridModule,
                http_1.HttpClientModule,
                typeahead_menu_component_1.TypeaheadMenuComponent,
                list_group_component_1.ListGroupComponent,
                datepicker_component_1.Datepicker,
                editor_directive_1.EditorDirective,
                equal_directive_1.Equal,
                search_component_1.GridSearchComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map