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
var LockComponent = /** @class */ (function (_super) {
    __extends(LockComponent, _super);
    function LockComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LockComponent.prototype.ngOnInit = function () {
        this.myModel = this.myModel === undefined ? false : this.myModel;
    };
    LockComponent.prototype.onClick = function () {
        this.setCellValue(!this.myModel);
        this.columnContext.formGroup.markAsDirty();
    };
    LockComponent = __decorate([
        core_1.Component({
            selector: 'lock-grid',
            moduleId: module.id,
            template: "\n        <div class=\"lock-container\">\n            <img (click)=\"onClick()\" *ngIf=\"!myModel\" class=\"unlock-false\" src=\"/Images/unlock.png\">\n            <img (click)=\"onClick()\" *ngIf=\"myModel\" class=\"lock-true\" src=\"/Images/lock.png\">\n        </div>\n\n        <input \n            type=\"text\" \n            hidden           \n            [name]=\"name\"            \n            #model=\"ngModel\"\n            [(ngModel)]=\"myModel\" >\n    ",
            styles: ["\n        :host .lock-container {\n            margin-left: 12px;\n            text-align: center;\n            height: 21px;\n        }\n        :host .lock-container > img {\n            height: 21px;\n        }\n    "]
        })
    ], LockComponent);
    return LockComponent;
}(grid_editor_base_1.GridEditorBase));
exports.LockComponent = LockComponent;
//# sourceMappingURL=lock.component.js.map