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
var editor_type_1 = require("../enum/editor-type");
var EditorDirective = /** @class */ (function () {
    function EditorDirective() {
        this.editorType = editor_type_1.EditorType.text;
    }
    EditorDirective.prototype.onKeypress = function (event) {
        if (event.charCode === 8)
            return true;
        if (this.editorType === editor_type_1.EditorType.numeric)
            return (event.charCode >= 48 && event.charCode <= 57);
        if (this.editorType === editor_type_1.EditorType.decimal) {
            return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 110 || event.charCode === 190;
        }
    };
    __decorate([
        core_1.Input('star-editor'),
        __metadata("design:type", Number)
    ], EditorDirective.prototype, "editorType", void 0);
    __decorate([
        core_1.HostListener('keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], EditorDirective.prototype, "onKeypress", null);
    EditorDirective = __decorate([
        core_1.Directive({
            selector: 'input[star-editor]',
        })
    ], EditorDirective);
    return EditorDirective;
}());
exports.EditorDirective = EditorDirective;
//# sourceMappingURL=editor.directive.js.map