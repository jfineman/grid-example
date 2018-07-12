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
require("rxjs/add/operator/first");
require("rxjs/add/operator/takeWhile");
var ListGroupComponent = /** @class */ (function () {
    function ListGroupComponent() {
        this._allSelected = true;
        this.enableSelectAll = true;
        this.requiredMessage = 'Required';
        this.allSelectedChange = new core_1.EventEmitter();
        this.dirty = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
    }
    Object.defineProperty(ListGroupComponent.prototype, "allSelected", {
        get: function () {
            return this._allSelected;
        },
        set: function (value) {
            this._allSelected = value;
            this.allSelectedChange.emit(this._allSelected);
        },
        enumerable: true,
        configurable: true
    });
    ListGroupComponent.prototype.ngOnInit = function () {
        this.setFormChangeObserver();
    };
    ListGroupComponent.prototype.ngOnChanges = function (changes) {
        if (!this.data)
            return;
        if (this.allSelected || this.isAllSelected()) {
            this.selectAll();
            this.reset();
        }
        this.filterSelected();
        this.validate();
        if (changes['data'])
            this.reset();
    };
    ListGroupComponent.prototype.reset = function () {
        this.dirty.emit(false);
        this.listGroupForm.form.markAsPristine();
        this.listGroupForm.form.markAsUntouched();
        this.setFormChangeObserver();
    };
    ListGroupComponent.prototype.setFormChangeObserver = function () {
        var _this = this;
        if (this.formChange$) {
            this.formChange$.unsubscribe();
        }
        setTimeout(function () {
            return _this.formChange$ = _this.listGroupForm.form.valueChanges
                .first(function () { return _this.listGroupForm.form.dirty; })
                .subscribe(function (changes) {
                _this.dirty.emit(true);
            });
        }, 1000);
    };
    ListGroupComponent.prototype.validate = function () {
        if (this.required) {
            this.oneSelected = this.data.some(function (item) { return item.isSelected; });
        }
        if (!this.parent)
            return;
        if (this.required && !this.oneSelected) {
            this.parent.form.setErrors((_a = {}, _a[this.title] = true, _a), { emitEvent: true });
        }
        else if (this.data.some(function (item) { return !!item.customError; })) {
            this.parent.form.setErrors((_b = {}, _b[this.title] = true, _b), { emitEvent: true });
        }
        else if (this.parent.form.hasError(this.title)) {
            var errors = this.parent.form.errors;
            delete errors[this.title];
            this.parent.form.setErrors(errors.length ? errors : null, { emitEvent: true });
        }
        var _a, _b;
    };
    ListGroupComponent.prototype.isAllSelected = function () {
        this.allSelected = !this.data.some(function (item) { return !item.isSelected; });
        return this.allSelected;
    };
    ListGroupComponent.prototype.selectRange = function (indexArr) {
        if (this.readonly)
            return;
        indexArr.sort();
        this.data.slice(indexArr[0], indexArr[1] + 1).forEach(function (item) {
            item.isSelected = true;
        });
        this.onListGroupClickEvt();
    };
    ListGroupComponent.prototype.onListGroupClickEvt = function () {
        if (this.parent)
            this.parent.form.markAsDirty();
        this.filterSelected();
        this.isAllSelected();
        this.validate();
    };
    ListGroupComponent.prototype.filterSelected = function () {
        if (!this.data)
            return;
        var filtered = this.data.filter(function (data) { return data.isSelected; });
        this.selected.emit(filtered);
    };
    ListGroupComponent.prototype.shiftAnchor = function () {
        var arr = this.data.filter(function (item) { return item.isSelected; });
        if (arr.length)
            this.selectionAnchor = arr[0];
        else
            this.selectionAnchor = null;
    };
    ListGroupComponent.prototype.selectAll = function () {
        this.allSelected = true;
        this.data.forEach(function (item) {
            item.isSelected = true;
        });
    };
    ListGroupComponent.prototype.deselectAll = function () {
        this.allSelected = false;
        this.data.forEach(function (item) {
            item.customError = null;
            item.isSelected = false;
        });
    };
    ListGroupComponent.prototype.toggleSelectAll = function () {
        if (this.readonly)
            return;
        if (!this.allSelected) {
            this.selectAll();
            this.reset();
        }
        else {
            this.deselectAll();
            this.selectionAnchor = null;
        }
        this.onListGroupClickEvt();
    };
    ListGroupComponent.prototype.selectOne = function ($event, item, index) {
        if (this.readonly || $($event.target).is('input'))
            return;
        if ($event.shiftKey) {
            this.deselectAll();
            this.selectRange([this.data.indexOf(this.selectionAnchor), index]);
        }
        else if ($event.ctrlKey) {
            //don't deselect and maintain current anchor
        }
        else {
            this.deselectAll();
            this.selectionAnchor = item;
        }
        item.isSelected = true;
        this.listGroupForm.form.markAsDirty();
        this.onListGroupClickEvt();
    };
    ListGroupComponent.prototype.selectAtLeastOne = function (item) {
        if (this.readonly)
            return;
        item.isSelected = !item.isSelected;
        if (!this.selectionAnchor && item.isSelected) {
            this.selectionAnchor = item;
        }
        if (this.selectionAnchor && !item.isSelected) {
            this.shiftAnchor();
        }
        this.onListGroupClickEvt();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListGroupComponent.prototype, "enableSelectAll", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ListGroupComponent.prototype, "requiredMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListGroupComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.NgForm)
    ], ListGroupComponent.prototype, "parent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ListGroupComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ListGroupComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ListGroupComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ListGroupComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], ListGroupComponent.prototype, "allSelected", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ListGroupComponent.prototype, "allSelectedChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ListGroupComponent.prototype, "dirty", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ListGroupComponent.prototype, "selected", void 0);
    __decorate([
        core_1.ViewChild('form'),
        __metadata("design:type", forms_1.NgForm)
    ], ListGroupComponent.prototype, "listGroupForm", void 0);
    ListGroupComponent = __decorate([
        core_1.Component({
            selector: 'list-group',
            moduleId: module.id,
            templateUrl: "list-group.component.html",
            styleUrls: ['list-group.component.css'],
        })
    ], ListGroupComponent);
    return ListGroupComponent;
}());
exports.ListGroupComponent = ListGroupComponent;
//# sourceMappingURL=list-group.component.js.map