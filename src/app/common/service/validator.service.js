"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ValidatorService = /** @class */ (function () {
    function ValidatorService() {
    }
    ValidatorService.prototype.isUnique = function (component, gridContainer, columnName) {
        if (columnName === void 0) { columnName = component.columnContext.column.prop; }
        var myRow = component.columnContext.row;
        var excludedId = myRow[gridContainer.options.primaryKey];
        var myColumn = myRow[columnName] ? myRow[columnName].toLowerCase().trim() : myRow[columnName];
        if (!gridContainer.rows.every(function (row) {
            var column = row[columnName] ? row[columnName].toString().toLowerCase().trim() : row[columnName];
            return column !== myColumn || row[gridContainer.options.primaryKey] === excludedId;
        })) {
            return false;
        }
        return true;
    };
    ValidatorService.prototype.isUniqueCombo = function (component, gridContainer, columnA, columnB) {
        var myRow = component.columnContext.row;
        var excludedId = myRow[gridContainer.options.primaryKey];
        var myColumnA = myRow[columnA] ? myRow[columnA].toLowerCase().trim() : myRow[columnA];
        var myColumnB = myRow[columnB] ? myRow[columnB].toLowerCase().trim() : myRow[columnB];
        if (!gridContainer.rows.every(function (row) {
            var _columnA = row[columnA] ? row[columnA].toString().toLowerCase().trim() : row[columnA];
            var _columnB = row[columnB] ? row[columnB].toString().toLowerCase().trim() : row[columnB];
            return (_columnA !== myColumnA || _columnB !== myColumnB) || row[gridContainer.options.primaryKey] === excludedId;
        })) {
            return false;
        }
        return true;
    };
    ValidatorService.prototype.uniqueComboFn = function (component, gridContainer, columnA, columnB, message) {
        var _this = this;
        var mySub;
        return function (control) {
            if (mySub)
                mySub.unsubscribe();
            var nameOfOtherControl = component.columnContext.column.prop === columnA ? columnB : columnA;
            var rowId = component.columnContext.row[gridContainer.options.primaryKey];
            var otherControl = gridContainer.gridComponent.getEditorFormControlBy(rowId, nameOfOtherControl);
            if (!otherControl)
                return;
            mySub = otherControl.valueChanges.subscribe(function (val) { return control.updateValueAndValidity({ emitEvent: false }); });
            if (!_this.isUniqueCombo(component, gridContainer, columnA, columnB)) {
                return {
                    'customError': {
                        message: message || "Combination value for " + columnA + " and " + columnB + " must be unique"
                    }
                };
            }
            return forms_1.Validators.nullValidator;
        };
    };
    ValidatorService.prototype.uniqueFn = function (component, gridContainer, message) {
        var _this = this;
        return function (control) {
            if (!_this.isUnique(component, gridContainer)) {
                return {
                    'customError': {
                        message: message || "Value for " + component.columnContext.column.name + " must be unique"
                    }
                };
            }
            return forms_1.Validators.nullValidator;
        };
    };
    ValidatorService = __decorate([
        core_1.Injectable()
    ], ValidatorService);
    return ValidatorService;
}());
exports.ValidatorService = ValidatorService;
//# sourceMappingURL=validator.service.js.map