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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var editor_type_1 = require("../enum/editor-type");
var ContentEditorComponent = /** @class */ (function () {
    function ContentEditorComponent(name, renderer, element) {
        this.name = name;
        this.renderer = renderer;
        this.element = element;
        this.editMode = false;
        this.editorType = editor_type_1.EditorType.text;
        this.propagateChange = function () { };
    }
    ContentEditorComponent_1 = ContentEditorComponent;
    ContentEditorComponent.prototype.writeValue = function (value) {
        this.myModel = value;
    };
    ContentEditorComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    ContentEditorComponent.prototype.registerOnTouched = function (fn) { };
    ContentEditorComponent.prototype.ngAfterViewInit = function () {
        var $view = $('.view');
        $view.height($view.closest('td, th').height());
    };
    ContentEditorComponent.prototype.editStart = function () {
        var _this = this;
        if (this.readonly)
            return;
        this.editMode = true;
        var inputElement = this.renderer.createElement(this.element.nativeElement, 'input');
        this.renderer.invokeElementMethod(inputElement, 'focus', []);
        this.renderer.setElementAttribute(inputElement, 'value', this.myModel);
        this.renderer.listen(inputElement, 'blur', function (event) {
            _this.editMode = false;
            _this.myModel = $(inputElement).val();
            _this.propagateChange(_this.myModel);
            _this.renderer.detachView([inputElement]);
        });
        this.renderer.listen(inputElement, 'keypress', function (event) {
            if (event.charCode === 8)
                return true;
            if (_this.editorType === editor_type_1.EditorType.numeric)
                return (event.charCode >= 48 && event.charCode <= 57);
            if (_this.editorType === editor_type_1.EditorType.decimal) {
                return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 110 || event.charCode === 190;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContentEditorComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input('content-editor'),
        __metadata("design:type", Number)
    ], ContentEditorComponent.prototype, "editorType", void 0);
    ContentEditorComponent = ContentEditorComponent_1 = __decorate([
        core_1.Component({
            selector: 'td[content-editor],th[content-editor]',
            moduleId: module.id,
            template: "\n        <div id=\"{{name}}\" [ngClass]=\"{'readonly': readonly}\" class=\"view\" [hidden]=\"editMode\" [title]=\"myModel || ''\" (click)=\"editStart()\">{{myModel}}</div>\n    ",
            styles: ["\n        :host /deep/ input{\n            width: 100%;\n            padding: 0;\n        }\n        input, div.view {\n            text-align: right;\n        }\n        .readonly{\n            background-color: #eceeef;\n            opacity: 1;\n        }\n    "],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return ContentEditorComponent_1; }), multi: true }
            ]
        }),
        __param(0, core_1.Attribute('name')),
        __metadata("design:paramtypes", [String, core_1.Renderer,
            core_1.ElementRef])
    ], ContentEditorComponent);
    return ContentEditorComponent;
    var ContentEditorComponent_1;
}());
exports.ContentEditorComponent = ContentEditorComponent;
//# sourceMappingURL=content-editor.component.js.map