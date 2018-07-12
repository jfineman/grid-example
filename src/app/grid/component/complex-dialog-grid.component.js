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
var complex_dialog_content_component_1 = require("./complex-dialog-content.component");
var ComplexDialogGridComponent = /** @class */ (function (_super) {
    __extends(ComplexDialogGridComponent, _super);
    function ComplexDialogGridComponent(modalService) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        return _this;
    }
    ComplexDialogGridComponent.prototype.open = function (columnContext) {
        var _this = this;
        if (columnContext.column.readonly || columnContext.column.disabled)
            return;
        var dialogOptions = { backdrop: 'static' };
        var size = this.columnContext.column.size;
        if (size)
            dialogOptions.size = size;
        this.modalRef = this.modalService.open(complex_dialog_content_component_1.ComplexDialogContentComponent, dialogOptions);
        this.modalRef.componentInstance.columnContext = columnContext;
        this.modalRef.componentInstance.row = columnContext.row;
        this.modalRef.result.then(function (result) {
            _this.columnContext.formGroup.markAsDirty();
            columnContext.row[columnContext.column.id] = result;
            columnContext.column.onValueChange(result, _this);
        }, function (dismissed) {
        });
    };
    ;
    ComplexDialogGridComponent = __decorate([
        core_1.Component({
            selector: 'complex-dialog-grid',
            moduleId: module.id,
            templateUrl: 'complex-dialog-grid.component.html',
            styles: ["\n        .input-group-addon{\n            height:30px;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], ComplexDialogGridComponent);
    return ComplexDialogGridComponent;
}(grid_editor_base_1.GridEditorBase));
exports.ComplexDialogGridComponent = ComplexDialogGridComponent;
//# sourceMappingURL=complex-dialog-grid.component.js.map