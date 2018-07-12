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
var grid_options_1 = require("../contract/grid-options");
var column_context_1 = require("../contract/column-context");
var HierarchicalGridComponent = /** @class */ (function () {
    function HierarchicalGridComponent() {
        this.options = new grid_options_1.GridOptions();
        this.onChildViewUpdate = new core_1.EventEmitter();
        this.onChildRowAdd = new core_1.EventEmitter();
        this.onChildRowAdded = new core_1.EventEmitter();
        this.onChildRowUpdate = new core_1.EventEmitter();
    }
    Object.defineProperty(HierarchicalGridComponent.prototype, "columnContext", {
        get: function () {
            return this._columnContext;
        },
        set: function (value) {
            this._columnContext = value;
            this.rows = this.columnContext.row[this.columnContext.column.prop] || [];
            this.columns = this.columnContext.column.columns.map(function (c) { return Object.assign({}, c); });
            Object.assign(this.options, this.columnContext.column.options);
        },
        enumerable: true,
        configurable: true
    });
    ;
    HierarchicalGridComponent.prototype.onViewUpdate = function (rows) {
        this.onChildViewUpdate.next(rows);
    };
    HierarchicalGridComponent.prototype.onRowAdd = function (row) {
        row.parentId = this.columnContext.parentId;
        this.onChildRowAdd.next(row);
    };
    HierarchicalGridComponent.prototype.onRowAdded = function (row) {
        row.parentId = this.columnContext.parentId;
        this.onChildRowAdded.next(row);
    };
    HierarchicalGridComponent.prototype.onRowUpdate = function (pair) {
        this.onChildRowUpdate.next(pair);
    };
    HierarchicalGridComponent.prototype.save = function () {
        throw new Error('Method not implemented.');
    };
    HierarchicalGridComponent.prototype.cancelChanges = function () {
        throw new Error('Method not implemented.');
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], HierarchicalGridComponent.prototype, "onChildViewUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], HierarchicalGridComponent.prototype, "onChildRowAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], HierarchicalGridComponent.prototype, "onChildRowAdded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], HierarchicalGridComponent.prototype, "onChildRowUpdate", void 0);
    __decorate([
        core_1.ViewChild(core_1.forwardRef(function () { return grid_component_1.GridComponent; })),
        __metadata("design:type", grid_component_1.GridComponent)
    ], HierarchicalGridComponent.prototype, "gridComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_context_1.ColumnContext),
        __metadata("design:paramtypes", [column_context_1.ColumnContext])
    ], HierarchicalGridComponent.prototype, "columnContext", null);
    HierarchicalGridComponent = __decorate([
        core_1.Component({
            selector: 'hierarchical-grid',
            moduleId: module.id,
            templateUrl: 'hierarchical-grid.component.html',
            styles: ["\n        :host /deep/ #star-grid-add-row {\n            background-color: #d9e7fe;\n            padding: 2px;\n            height: 20px;\n            margin: 2px;\n            font-size: small;\n            color: #104e97;\n        }\n        :host /deep/ #grid-footer {\n            display: none;\n        }\n        :host /deep/ thead > tr {\n            height: 20px;\n            \n        }\n        :host /deep/ thead > tr > th {\n            height: 20px;\n        }\n        :host /deep/ thead > tr:first-child > th {\n            background-color: #c0d6fb;\n            color: #104e97;\n            font-size: small;\n        }\n        :host /deep/ .grid-container {\n            overflow-y: inherit;\n        }\n        :host /deep/ .grid-container tbody tr {\n            background-color: #f3f7fe;\n        }\n        :host /deep/ .popover-content {\n            color: black;\n        }\n    "]
        })
    ], HierarchicalGridComponent);
    return HierarchicalGridComponent;
}());
exports.HierarchicalGridComponent = HierarchicalGridComponent;
//# sourceMappingURL=hierarchical-grid.component.js.map