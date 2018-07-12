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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var grid_options_1 = require("../contract/grid-options");
var grid_component_1 = require("./grid.component");
var column_context_1 = require("../contract/column-context");
var ComplexDialogContentComponent = /** @class */ (function () {
    function ComplexDialogContentComponent(activeModal) {
        this.activeModal = activeModal;
        this.selection = [];
        this._options = new grid_options_1.GridOptions();
    }
    ComplexDialogContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        var checkboxOptions = {
            checkBoxes: true,
            canAdd: false,
            canDelete: false,
            canEdit: false
        };
        Object.assign(this._options, checkboxOptions, this.columnContext.column.options);
        this.selection = (this.columnContext.row[this.columnContext.column.id]);
        this.data = this.columnContext.column.data;
        this.data.forEach(function (row) {
            row.checkbox = _this.selection && _this.selection.length ? _this.selection.some(function (d) { return d[_this._options.primaryKey] === row[_this._options.primaryKey]; }) : false;
        });
    };
    ComplexDialogContentComponent.prototype.onViewFilter = function (rows) {
        this.data = rows;
    };
    ComplexDialogContentComponent.prototype.save = function () {
        var _this = this;
        this.selection = this.selection.filter(function (sel) { return sel.checkbox &&
            !_this.data.some(function (data) { return !data.checkbox && data[_this._options.primaryKey] === sel[_this._options.primaryKey]; }); });
        this.selection = this.data.concat(this.selection).filter(function (d) { return d.checkbox; });
        this.columnContext.formGroup.markAsDirty();
        this.activeModal.close(this.selection);
    };
    ComplexDialogContentComponent.prototype.cancel = function () {
        this.activeModal.dismiss();
    };
    __decorate([
        core_1.ViewChild(grid_component_1.GridComponent),
        __metadata("design:type", grid_component_1.GridComponent)
    ], ComplexDialogContentComponent.prototype, "gridComponent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_context_1.ColumnContext)
    ], ComplexDialogContentComponent.prototype, "columnContext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComplexDialogContentComponent.prototype, "row", void 0);
    ComplexDialogContentComponent = __decorate([
        core_1.Component({
            selector: 'complex-dialog-content',
            moduleId: module.id,
            templateUrl: 'complex-dialog-content.component.html',
            styles: ["\n        :host /deep/ input[type='checkbox'].custom-error{\n            outline: 2px solid red;\n        }\n        :host /deep/ td:first-child div.ellipse {\n            overflow: inherit !important;\n        }\n        :host /deep/ tr.locked-row {\n            background-color: white;\n            color: black;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal])
    ], ComplexDialogContentComponent);
    return ComplexDialogContentComponent;
}());
exports.ComplexDialogContentComponent = ComplexDialogContentComponent;
//# sourceMappingURL=complex-dialog-content.component.js.map