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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grid_editor_base_1 = require("../contract/grid-editor-base");
var editor_type_1 = require("../../common/enum/editor-type");
var InputGridComponent = /** @class */ (function (_super) {
    __extends(InputGridComponent, _super);
    function InputGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._decimalRegex = /^[1-9]\d*(\.\d+)?$/;
        _this._numberRegex = /^[1-9]\d*$/;
        return _this;
    }
    InputGridComponent.prototype.ngOnInit = function () {
        var editorType = this.columnContext.column.editorType;
        this._editorType = editorType !== null ? editorType : editor_type_1.EditorType.text;
        if (this._editorType === editor_type_1.EditorType.decimal)
            this._pattern = this._decimalRegex;
    };
    InputGridComponent.prototype.onKeypress = function (event) {
        if (event.charCode === 8)
            return true;
        if (this._editorType === editor_type_1.EditorType.numeric)
            return (event.charCode >= 48 && event.charCode <= 57);
        if (this._editorType === editor_type_1.EditorType.decimal) {
            return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 110 || event.charCode === 190;
        }
        if (this._editorType === editor_type_1.EditorType.alpha) {
            return event.charCode === 32 || /[a-zA-Z]/.test(event.key);
        }
        if (this._editorType === editor_type_1.EditorType.alphanumeric) {
            return event.charCode === 32 || /[a-zA-Z]/.test(event.key) || (event.charCode >= 48 && event.charCode <= 57);
        }
    };
    InputGridComponent = __decorate([
        core_1.Component({
            selector: 'input-grid',
            moduleId: module.id,
            template: "\n        <input \n            type=\"text\" \n            (keypress)=\"onKeypress($event)\"\n            (keydown)=\"onKeydown($event)\"\n            [name]=\"name\" \n            [min]=\"columnContext.column.min\"\n            [max]=\"columnContext.column.max\"\n            [maxlength]=\"columnContext.column.maxlength\"\n            [minlength]=\"columnContext.column.minlength\"\n            class=\"form-control\"\n            #model=\"ngModel\"\n            [(ngModel)]=\"myModel\"\n            (ngModelChange)=\"setCellValue($event)\"\n            [ngbTooltip]=\"displayTooltipMessage(model)\"\n            [ngClass]=\"{\n                'custom-error': model.hasError('customError'), \n                'max-length': model.hasError('maxlength'),                 \n                'min-length': model.hasError('minlength'),                               \n                'warning': warningMessage\n            }\"\n            [pattern]=\"_pattern\"\n            [readonly]=\"columnContext.column.readonly\"\n            [disabled]=\"columnContext.column.disabled || columnContext.column.readonly\"\n            [required]=\"columnContext.column.required\" >\n    ",
            styles: ["\n\n    "]
        })
    ], InputGridComponent);
    return InputGridComponent;
}(grid_editor_base_1.GridEditorBase));
exports.InputGridComponent = InputGridComponent;
//# sourceMappingURL=input-grid.component.js.map