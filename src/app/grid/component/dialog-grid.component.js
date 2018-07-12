"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var grid_editor_base_1 = require("../contract/grid-editor-base");
var DialogGridComponent = /** @class */ (function (_super) {
    __extends(DialogGridComponent, _super);
    function DialogGridComponent(modalService) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        return _this;
    }
    DialogGridComponent.prototype.onSelectItem = function (selection) {
        this.selection = selection.map(function (combo) { return combo.Value; }).join(', ').trim();
    };
    DialogGridComponent.prototype.initListGroup = function () {
        var _this = this;
        var columnValue = this.columnContext.row[this.columnContext.column.prop];
        this.columnContext.column.data.forEach(function (d) { return d.isSelected = false; });
        if (columnValue && this.columnContext.column.data) {
            columnValue.split(',').forEach(function (item) {
                var match = _this.columnContext.column.data.find(function (d) { return item.trim() == d.Value; });
                if (match)
                    match.isSelected = true;
            });
        }
    };
    DialogGridComponent.prototype.open = function (content) {
        if (this.columnContext.column.readonly || this.columnContext.column.disabled)
            return;
        this.initListGroup();
        this.modelRef = this.modalService.open(content, { backdrop: 'static' });
    };
    DialogGridComponent.prototype.save = function () {
        this.columnContext.formGroup.markAsDirty();
        this.myModel = this.selection;
        this.setCellValue(this.selection);
        this.modelRef.close();
    };
    DialogGridComponent.prototype.cancel = function () {
        this.modelRef.dismiss();
    };
    DialogGridComponent = __decorate([
        core_1.Component({
            selector: 'dialog-grid',
            moduleId: module.id,
            templateUrl: 'dialog-grid.component.html',
            styles: ["\n        .input-group-addon{\n            height:30px;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], DialogGridComponent);
    return DialogGridComponent;
}(grid_editor_base_1.GridEditorBase));
exports.DialogGridComponent = DialogGridComponent;
//# sourceMappingURL=dialog-grid.component.js.map