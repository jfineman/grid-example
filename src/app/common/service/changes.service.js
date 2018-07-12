"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChangesService = /** @class */ (function () {
    function ChangesService() {
    }
    ChangesService.prototype.setDirtyState = function (bool) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem('dirtyState', bool);
        }
        else {
            $.cookie('dirtyState', bool);
        }
    };
    ChangesService.prototype.getDirtyState = function () {
        if (window.sessionStorage) {
            return window.sessionStorage.getItem('dirtyState') === "true";
        }
        else {
            return $.cookie('dirtyState') === "true";
        }
    };
    ChangesService.prototype.ifDirtyConfirmCancelChanges = function (isDirty) {
        if (isDirty || this.getDirtyState()) {
            var leavepage = window.confirm("If you leave the current page now, any unsaved changes will be lost. Are you sure you want to leave the page?");
            if (leavepage)
                this.clear();
            return leavepage;
        }
        return true;
    };
    ChangesService.prototype.clear = function () {
        this.setDirtyState(false);
    };
    ChangesService.prototype.canDeactivate = function (component) {
        var canDeactivate = true;
        if (this.getDirtyState()) {
            canDeactivate = window.confirm("If you leave the current page now, any unsaved changes will be lost. Are you sure you want to leave the page?");
            if (canDeactivate)
                this.clear();
        }
        return canDeactivate;
    };
    ChangesService = __decorate([
        core_1.Injectable()
    ], ChangesService);
    return ChangesService;
}());
exports.ChangesService = ChangesService;
//# sourceMappingURL=changes.service.js.map