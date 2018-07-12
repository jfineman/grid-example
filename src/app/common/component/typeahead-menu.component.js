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
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var changes_service_1 = require("../service/changes.service");
var TypeaheadMenuComponent = /** @class */ (function () {
    function TypeaheadMenuComponent(_changesService) {
        var _this = this;
        this._changesService = _changesService;
        this.placeholder = '(Select)';
        this.dirtyCheck = true;
        this.onModelChange = new core_1.EventEmitter();
        this.onSelectedItem = new core_1.EventEmitter();
        this.onConfirmDiscardChanges = new core_1.EventEmitter();
        this.propagateChange = function () { };
        this.displayFn = function (item) { return item.hasOwnProperty('Text') ? item.Text : item; };
        this.resultFn = function (item) { return item.Text; };
        this.search = function (text$) {
            return text$
                .debounceTime(200)
                .map(function (term) {
                if (!term)
                    return _this.data;
                _this._result = _this.data.filter(function (v) { return new RegExp(term.replace(/\\/g, ''), 'gi').test(v.Text); });
                return _this._result;
            });
        };
    }
    TypeaheadMenuComponent_1 = TypeaheadMenuComponent;
    TypeaheadMenuComponent.prototype.ngOnInit = function () {
        this.ngModel.control.setValidators(this.validators);
    };
    TypeaheadMenuComponent.prototype.writeValue = function (value) {
        this._model = value;
    };
    TypeaheadMenuComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    TypeaheadMenuComponent.prototype.registerOnTouched = function (fn) {
    };
    TypeaheadMenuComponent.prototype.onSelectItem = function (selected) {
        if (this.dirtyCheck) {
            var isDirty = this._changesService.getDirtyState();
            if (this._changesService.ifDirtyConfirmCancelChanges()) {
                this.setComboValue(selected);
                if (isDirty)
                    this.onConfirmDiscardChanges.emit(selected.item);
            }
            else {
                selected.preventDefault();
            }
        }
        else {
            this.setComboValue(selected);
        }
    };
    TypeaheadMenuComponent.prototype.setComboValue = function (selected) {
        this.onSelectedItem.emit(selected.item);
        this.typeahead.writeValue(selected.item.Text);
        this.propagateChange(selected.item.Text);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TypeaheadMenuComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TypeaheadMenuComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TypeaheadMenuComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TypeaheadMenuComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TypeaheadMenuComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TypeaheadMenuComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TypeaheadMenuComponent.prototype, "dirtyCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TypeaheadMenuComponent.prototype, "validators", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TypeaheadMenuComponent.prototype, "onModelChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TypeaheadMenuComponent.prototype, "onSelectedItem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TypeaheadMenuComponent.prototype, "onConfirmDiscardChanges", void 0);
    __decorate([
        core_1.ViewChild(forms_1.NgModel),
        __metadata("design:type", forms_1.NgModel)
    ], TypeaheadMenuComponent.prototype, "ngModel", void 0);
    __decorate([
        core_1.ViewChild(ng_bootstrap_1.NgbTypeahead),
        __metadata("design:type", ng_bootstrap_1.NgbTypeahead)
    ], TypeaheadMenuComponent.prototype, "typeahead", void 0);
    TypeaheadMenuComponent = TypeaheadMenuComponent_1 = __decorate([
        core_1.Component({
            selector: 'typeahead-menu',
            moduleId: module.id,
            templateUrl: "typeahead-menu.component.html",
            styleUrls: ['typeahead-menu.component.css'],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TypeaheadMenuComponent_1; }), multi: true }
            ]
        }),
        __metadata("design:paramtypes", [changes_service_1.ChangesService])
    ], TypeaheadMenuComponent);
    return TypeaheadMenuComponent;
    var TypeaheadMenuComponent_1;
}());
exports.TypeaheadMenuComponent = TypeaheadMenuComponent;
//# sourceMappingURL=typeahead-menu.component.js.map