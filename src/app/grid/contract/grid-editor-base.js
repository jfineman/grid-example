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
var forms_1 = require("@angular/forms");
var column_context_1 = require("./column-context");
var combo_item_1 = require("../../common/contract/combo-item");
var core_1 = require("@angular/core");
require("rxjs/add/operator/skipWhile");
require("rxjs/add/operator/takeWhile");
var GridEditorBase = /** @class */ (function () {
    function GridEditorBase() {
    }
    Object.defineProperty(GridEditorBase.prototype, "columnContext", {
        get: function () {
            return this._columnContext;
        },
        set: function (value) {
            var _this = this;
            if (!value)
                return;
            this._columnContext = value;
            this.name = this.columnContext.column.prop;
            this.customMessage = this.columnContext.column.customMessage || this.customMessage;
            this.columnContext.formGroup.removeControl(this.name);
            this.columnContext.formGroup.addControl(this.name, this.ngModel.control);
            if (this.columnContext.column.customValidator)
                this.ngModel.control.setValidators(this.columnContext.column.customValidator(this));
            if (this.columnContext.column.onValueChange)
                this.ngModel.control.valueChanges
                    .skipWhile(function () { return _this.columnContext.formGroup.pristine; })
                    .subscribe(function (v) { return _this.columnContext.column.onValueChange(v, _this); });
            if (this.columnContext.column.onEditStart)
                this.ngModel.control.valueChanges
                    .takeWhile(function () { return _this.columnContext.formGroup.pristine; })
                    .subscribe(function (v) { return _this.columnContext.column.onEditStart(v, _this); });
            this.myModel = this.columnContext.row[this.columnContext.column.prop] || this.columnContext.column.defaultValue;
            this.columnContext.row[this.columnContext.column.prop] = this.myModel;
            this.format();
        },
        enumerable: true,
        configurable: true
    });
    GridEditorBase.prototype.format = function () {
        if (this.columnContext.column.format && this.myModel) {
            this.columnContext.row[this.columnContext.column.formatted] = this.columnContext.column.format.transform(this.myModel);
        }
    };
    GridEditorBase.prototype.onKeydown = function (e) {
        if (this.columnContext.column.preventTab !== null && this.columnContext.column.preventTab === false)
            return;
        if (e.which == 9 && this.ngModel.invalid) {
            e.preventDefault();
        }
    };
    GridEditorBase.prototype.setCellValue = function (value) {
        this.myModel = value;
        this.columnContext.row[this.columnContext.column.prop] = value;
        this.format();
    };
    GridEditorBase.prototype.setCellComboValue = function (selected) {
        if (!selected)
            selected = new combo_item_1.ComboItem('', '');
        this.setCellValue(selected.Text);
        if (this.columnContext.column.id)
            this.columnContext.row[this.columnContext.column.id] = selected.Value;
    };
    GridEditorBase.prototype.displayTooltipMessage = function (model) {
        if (!model)
            return;
        //depracated, use customError.message
        if (this.customMessage)
            return this.customMessage;
        if (model.hasError('customError') && model.getError('customError').message)
            return model.getError('customError').message;
        if (model.hasError('required'))
            return 'Required';
        return this.warningMessage;
    };
    GridEditorBase.prototype.setNgClass = function (model) {
        if (model.hasError('customError'))
            return {
                'custom-error': true
            };
        if (this.warningMessage)
            return {
                'warning': true
            };
    };
    __decorate([
        core_1.ViewChild('model'),
        __metadata("design:type", forms_1.NgModel)
    ], GridEditorBase.prototype, "ngModel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_context_1.ColumnContext),
        __metadata("design:paramtypes", [column_context_1.ColumnContext])
    ], GridEditorBase.prototype, "columnContext", null);
    return GridEditorBase;
}());
exports.GridEditorBase = GridEditorBase;
//# sourceMappingURL=grid-editor-base.js.map