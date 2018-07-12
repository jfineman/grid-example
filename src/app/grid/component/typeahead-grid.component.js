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
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var grid_editor_base_1 = require("../contract/grid-editor-base");
var TypeaheadGridComponent = /** @class */ (function (_super) {
    __extends(TypeaheadGridComponent, _super);
    function TypeaheadGridComponent() {
        var _this = _super.call(this) || this;
        _this.displayFn = function (item) { return item && item.hasOwnProperty('Text') ? item.Text : item; };
        _this.resultFn = function (item) { return item.Text; };
        _this.search = function (text$) {
            return text$
                .debounceTime(100)
                .map(function (term) {
                if (!term) {
                    return _this.columnContext.column.data;
                }
                _this._result = _this.columnContext.column.data.filter(function (v) { return new RegExp(term.replace(/\\/g, ''), 'gi').test(v.Text); });
                return _this._result;
            });
        };
        return _this;
    }
    TypeaheadGridComponent.prototype.onSelectItem = function (selected) {
        this.setCellComboValue(selected);
    };
    TypeaheadGridComponent.prototype.onKeydown = function (e) {
        _super.prototype.onKeydown.call(this, e);
        if (this.columnContext.column.preventTab !== null && this.columnContext.column.preventTab === false)
            return;
    };
    __decorate([
        core_1.ViewChild(ng_bootstrap_1.NgbTypeahead),
        __metadata("design:type", ng_bootstrap_1.NgbTypeahead)
    ], TypeaheadGridComponent.prototype, "typeahead", void 0);
    TypeaheadGridComponent = __decorate([
        core_1.Component({
            selector: 'typeahead-grid',
            moduleId: module.id,
            templateUrl: "typeahead-grid.component.html",
            styleUrls: ['typeahead-grid.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], TypeaheadGridComponent);
    return TypeaheadGridComponent;
}(grid_editor_base_1.GridEditorBase));
exports.TypeaheadGridComponent = TypeaheadGridComponent;
//# sourceMappingURL=typeahead-grid.component.js.map