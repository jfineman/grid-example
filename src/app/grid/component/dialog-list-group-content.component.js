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
var column_context_1 = require("../contract/column-context");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var list_group_component_1 = require("../../common/component/list-group.component");
var DialogListGroupContentComponent = (function () {
    function DialogListGroupContentComponent(activeModal) {
        this.activeModal = activeModal;
        console.log(this);
    }
    DialogListGroupContentComponent.prototype.onSelectItem = function (selection) {
        this.selection = selection.map(function (combo) { return combo.Value; }).join(', ').trim();
    };
    DialogListGroupContentComponent.prototype.initListGroup = function () {
        var _this = this;
        var columnValue = this.columnContext.row[this.columnContext.column.prop];
        if (columnValue && this.columnContext.column.data) {
            this.columnContext.column.data.forEach(function (d) { return d.isSelected = false; });
            columnValue.split(',').forEach(function (item) {
                var match = _this.columnContext.column.data.find(function (d) { return item.trim() == d.Value; });
                if (match)
                    match.isSelected = true;
            });
        }
    };
    DialogListGroupContentComponent.prototype.save = function () {
        this.activeModal.close(this.selection);
    };
    DialogListGroupContentComponent.prototype.cancel = function () {
        this.activeModal.dismiss();
    };
    return DialogListGroupContentComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", column_context_1.ColumnContext)
], DialogListGroupContentComponent.prototype, "columnContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DialogListGroupContentComponent.prototype, "row", void 0);
__decorate([
    core_1.ViewChild('f'),
    __metadata("design:type", forms_1.NgForm)
], DialogListGroupContentComponent.prototype, "form", void 0);
__decorate([
    core_1.ViewChild(list_group_component_1.ListGroupComponent),
    __metadata("design:type", list_group_component_1.ListGroupComponent)
], DialogListGroupContentComponent.prototype, "listGroup", void 0);
DialogListGroupContentComponent = __decorate([
    core_1.Component({
        selector: 'dialog-list-group-content',
        moduleId: module.id,
        templateUrl: 'dialog-list-group-content.component.html'
    }),
    __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal])
], DialogListGroupContentComponent);
exports.DialogListGroupContentComponent = DialogListGroupContentComponent;
//# sourceMappingURL=dialog-list-group-content.component.js.map