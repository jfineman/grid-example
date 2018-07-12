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
var edit_mode_1 = require("../enum/edit-mode");
var transaction_type_1 = require("../const/transaction-type");
var grid_options_1 = require("../contract/grid-options");
var data_column_directive_1 = require("../directive/data-column.directive");
var changes_service_1 = require("../../common/service/changes.service");
var column_filter_directive_1 = require("../directive/column-filter.directive");
var datepicker_grid_component_1 = require("./datepicker-grid.component");
var date_service_1 = require("../../common/service/date.service");
var checkbox_grid_component_1 = require("./checkbox-grid.component");
var hierarchical_grid_component_1 = require("./hierarchical-grid.component");
var grid_cell_directive_1 = require("../directive/grid-cell-directive");
var search_1 = require("../service/search");
var util_service_1 = require("../../common/service/util.service");
var GridComponent = /** @class */ (function () {
    function GridComponent(_elRef, _changesService, _dateService, searchService, _utilService) {
        this._elRef = _elRef;
        this._changesService = _changesService;
        this._dateService = _dateService;
        this.searchService = searchService;
        this._utilService = _utilService;
        this._isSortAsc = false;
        this._columns = [];
        this._columnHeaders = [];
        this.transactions = new Array();
        this.copyOfRow = {};
        this.copyOfRows = [];
        this.newRow = { Id: 0, transactionType: transaction_type_1.TransactionType.Addrow };
        this.editMode = edit_mode_1.EditMode.None;
        this.options = new grid_options_1.GridOptions();
        this.onViewFilter = new core_1.EventEmitter();
        this.onViewUpdate = new core_1.EventEmitter();
        this.onRowUpdate = new core_1.EventEmitter();
        this.onRowSelection = new core_1.EventEmitter();
        this.onRowEdit = new core_1.EventEmitter();
        this.onRowAdd = new core_1.EventEmitter();
        this.onChildRowAdd = new core_1.EventEmitter();
        this.onChildRowAdded = new core_1.EventEmitter();
        this.onChildRowUpdate = new core_1.EventEmitter();
        this.onRowAdded = new core_1.EventEmitter();
        this.onRowExpanded = new core_1.EventEmitter();
    }
    Object.defineProperty(GridComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (value) {
            this._rows = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            var _this = this;
            this._columns = val;
            if (!this._columns || !this.columns.length)
                throw 'No columns are set for the grid!';
            if (this.options.childGrid && !this.columns.some(function (c) { return c.prop === 'caret'; })) {
                this.columns.unshift({
                    name: '',
                    prop: 'caret',
                    width: '45px',
                    notSortable: true,
                    customTemplate: this.caretTemplate
                });
            }
            if (this.options.checkBoxes && !this.columns.some(function (c) { return c.prop === 'checkbox'; })) {
                this.columns.unshift({
                    name: '',
                    prop: 'checkbox',
                    width: '35px',
                    component: checkbox_grid_component_1.CheckboxGridComponent
                });
            }
            this.options.groupHeader = this.columns.some(function (columns) { return !!columns.header; });
            if (this.options.groupHeader) {
                this._columns.forEach(function (columns) {
                    if (!_this._columnHeaders.find(function (ch) { return columns.header === ch.header; }) || !columns.header)
                        _this._columnHeaders.push(columns);
                });
            }
            if (!this.options.defaultColumnSort) {
                this.options.defaultColumnSort = this.firstVisibleColumn();
            }
        },
        enumerable: true,
        configurable: true
    });
    GridComponent.prototype.getOriginalColumnValueBy = function (rowId, columnName) {
        var _this = this;
        var row = this.copyOfRows.find(function (row) { return row[_this.options.primaryKey] === rowId; });
        return row[columnName];
    };
    GridComponent.prototype.getColumnValueBy = function (rowId, columnName) {
        var _this = this;
        var row = this.rows.find(function (row) { return row[_this.options.primaryKey] === rowId; });
        return row[columnName];
    };
    GridComponent.prototype.getCellBy = function (rowId, columnName) {
        var _this = this;
        if (!this.cells || !this.cells.length)
            return;
        var cellDirective = this.cells.find(function (cell) {
            return cell.columnContext.row[_this.options.primaryKey] === rowId && cell.columnContext.column.prop === columnName;
        });
        return cellDirective;
    };
    GridComponent.prototype.getEditorComponentBy = function (rowId, columnName) {
        var _this = this;
        if (!this.editors || !this.editors.length)
            return;
        var columnDirective = this.editors.find(function (editor) {
            return editor.component &&
                editor.component.columnContext.row[_this.options.primaryKey] === rowId && editor.component.columnContext.column.prop === columnName;
        });
        return columnDirective ? columnDirective.component : null;
    };
    GridComponent.prototype.getChildGridBy = function (parentId) {
        if (!this.childGrids || !this.childGrids.length)
            return;
        var child = this.childGrids.find(function (childGrid) {
            return childGrid.columnContext.parentId === parentId;
        });
        return child ? child.gridComponent : null;
    };
    GridComponent.prototype.checkForChildlessRows = function (childRowCollectionPropertyName) {
        if (!this.rows || !this.rows.length)
            return;
        return this.rows
            .filter(function (row) { return row.transactionType !== transaction_type_1.TransactionType.Deleterow; })
            .some(function (row) { return !row[childRowCollectionPropertyName] || !row[childRowCollectionPropertyName].length
            || row[childRowCollectionPropertyName].every(function (child) { return child.transactionType === transaction_type_1.TransactionType.Deleterow; }); });
    };
    GridComponent.prototype.anyChildTransactions = function () {
        return this.childGrids ? this.childGrids
            .some(function (childGrid) { return childGrid.gridComponent.transactions.length > 0; }) : false;
    };
    GridComponent.prototype.getEditorFormControlBy = function (rowId, columnName) {
        var editor = this.getEditorComponentBy(rowId, columnName);
        return editor && editor.ngModel ? editor.ngModel.control : null;
    };
    GridComponent.prototype.save = function () {
        if (!this.rows.length)
            return;
        if (this.childGrids)
            this.childGrids
                .forEach(function (child) { return child.gridComponent.save(); });
        this.transactions = [];
        var i = this.rows.length - 1;
        while (i > -1) {
            switch (this.rows[i].transactionType) {
                case transaction_type_1.TransactionType.Deleterow:
                    this.rows.splice(i, 1);
                    break;
                default:
                    this.rows[i].transactionType = undefined;
            }
            i--;
        }
        if (this.options.canSearch)
            this.searchService.resetSearch();
        this._changesService.clear();
        this.tableForm.form.markAsUntouched();
        this.tableForm.form.markAsPristine();
        this.setEditMode(edit_mode_1.EditMode.Saved);
        // this.sortGrid();
    };
    GridComponent.prototype.hasRows = function () {
        return this.rows ?
            this.rows.some(function (row) {
                return row.transactionType !== transaction_type_1.TransactionType.Deleterow;
            })
            : false;
    };
    GridComponent.prototype.expandRow = function ($event, row) {
        $event.stopPropagation();
        row.expanded = !row.expanded;
        if (row.expanded) {
            setTimeout(function () {
                var target = $event.target;
                var closestTd = $(target).closest('tr');
                var child = $(closestTd).next('.child-row')[0];
                var isInVisible = ($(child).offset().top - $('.grid-container:first').offset().top) + $(child).height() > $('.grid-container:first').height();
                if (isInVisible)
                    child.scrollIntoView(false);
            });
            this.onRowExpanded.next($event);
        }
    };
    GridComponent.prototype.cancel = function () {
        this.tableForm.form.markAsPristine();
        for (var name_1 in this.tableForm.form.controls) {
            this.tableForm.form.controls[name_1].setErrors(null);
        }
        if (this.editMode === edit_mode_1.EditMode.Edit) {
            this.setEditMode(edit_mode_1.EditMode.None);
            this.updateCurrentRowValue(this.copyOfRow);
        }
        if (this.editMode === edit_mode_1.EditMode.Add) {
            this.setEditMode(edit_mode_1.EditMode.None);
            this.newRow = this.copyOfRow;
        }
        this.copyOfRow = {};
    };
    GridComponent.prototype.done = function () {
        this._changesService.setDirtyState(true);
        this.tableForm.form.markAsPristine();
        this.setEditMode(edit_mode_1.EditMode.None);
        this.copyOfRows = this._utilService.copyArray(this.rows);
        this.copyOfRow = {};
    };
    GridComponent.prototype.deleteChildRows = function (parentRow) {
        var _this = this;
        parentRow.expanded = true;
        setTimeout(function () {
            var childGrid = _this.getChildGridBy(parentRow[_this.options.primaryKey]);
            if (childGrid && childGrid.rows) {
                childGrid.rows
                    .filter(function (r) { return r.transactionType != transaction_type_1.TransactionType.Deleterow; })
                    .forEach(function (r) { return childGrid.deleteRow(null, r); });
            }
        });
    };
    GridComponent.prototype.deleteRow = function (clickEvent, row) {
        if (row.transactionType === transaction_type_1.TransactionType.Deleterow)
            return;
        if (clickEvent)
            clickEvent.stopPropagation();
        if (!this.options.canDeleteRow || this.options.canDeleteRow(row)) {
            row.transactionType = transaction_type_1.TransactionType.Deleterow;
            this.updateTransactions(row);
            this.onViewUpdateHandler(this.rows, row);
            this.onRowUpdateHandler(row);
            this.done();
            if (this.options.childGrid) {
                this.deleteChildRows(row);
            }
        }
    };
    GridComponent.prototype.onAddRow = function () {
        if (!this.options.canAdd)
            return;
        this.setEditMode(edit_mode_1.EditMode.Add);
        this.generateNewId();
        this.copyOfRow = Object.assign({}, this.newRow);
        this.onRowAdd.next(this.newRow);
    };
    GridComponent.prototype.generateNewId = function () {
        var newid = 0;
        for (var i = 0; i < this.transactions.length; i++) {
            var currentRow = Math.abs(this.transactions[i][this.options.primaryKey]);
            if (currentRow > newid)
                newid = currentRow;
        }
        this.newRow[this.options.primaryKey] = this.newRow.Id = -(newid + 1);
    };
    GridComponent.prototype.selectRow = function (row) {
        this._selectedRowKey = row[this.options.primaryKey];
        this.onRowSelection.next(row);
    };
    GridComponent.prototype.setRowInEditMode = function (row) {
        this.cancel();
        this.onEditRow(row);
    };
    GridComponent.prototype.onEditRow = function (row) {
        if (this.options.rowSelector
            && this.editMode !== edit_mode_1.EditMode.Edit
            && this._selectedRowKey !== row[this.options.primaryKey]) {
            this.selectRow(row);
            return;
        }
        if (!this.options.canEdit)
            return;
        if (row.transactionType === transaction_type_1.TransactionType.Deleterow)
            return;
        if (this.options.isRowEditable && !this.options.isRowEditable(row))
            return;
        if (this.editMode === edit_mode_1.EditMode.None || this.editMode === edit_mode_1.EditMode.Saved) {
            this._selectedRowKey = null;
            this.setEditMode(edit_mode_1.EditMode.Edit);
            this.tableForm.form.markAsTouched();
            row.Id = row[this.options.primaryKey];
            this.onRowEdit.next(row);
            this.copyOfRow = Object.assign({}, row);
        }
    };
    GridComponent.prototype.updateValue = function () {
        var _this = this;
        var row;
        if (this.tableForm.form.pristine)
            return;
        switch (this.editMode) {
            case edit_mode_1.EditMode.Add:
                this.rows.push(this.newRow);
                row = this.newRow;
                this.onRowAdded.next(row);
                this.newRow = Object.assign({}, this.copyOfRow);
                this.isScrollBarVisible(function () { return $('.grid-container:first > table > tbody > tr:last-child')[0].scrollIntoView(); });
                break;
            case edit_mode_1.EditMode.Edit:
                row = this.rows.find(function (row) { return row[_this.options.primaryKey] === _this.copyOfRow[_this.options.primaryKey]; });
                row.transactionType = transaction_type_1.TransactionType.Editrow;
                this.updateCurrentRowValue(row);
                break;
        }
        this.updateTransactions(row);
        this.onViewUpdateHandler(this.rows, row);
        this.onRowUpdateHandler(row);
        this.done();
    };
    GridComponent.prototype.filterGrid = function () {
        var filters = this.filters.toArray();
        var results = this.copyOfRows.slice();
        if (!filters.length || !results.length)
            return;
        filters.forEach(function (f) {
            results = Object.assign([], results.filter(function (r) { return new RegExp(f._elementRef.nativeElement.value.replace(/\\/g, ''), 'gi')
                .test(r[f.fieldName]); }));
        });
        this.rows = results.slice();
        this.onViewFilter.next(this.rows);
        this.isScrollBarVisible();
    };
    GridComponent.prototype.sortGrid = function (column, isSortOn) {
        var _this = this;
        if (column === void 0) { column = this.options.defaultColumnSort; }
        if (isSortOn === void 0) { isSortOn = true; }
        if (!this.options.canSort || !isSortOn || column.notSortable)
            return;
        this._isSortAsc = this._fieldNameSort !== column.prop ? true : !this._isSortAsc;
        this._fieldNameSort = column.prop;
        return this.rows.sort(function (a, b) {
            var fieldA = a[_this._fieldNameSort] || "";
            var fieldB = b[_this._fieldNameSort] || "";
            //not an integer
            if (fieldA !== parseInt(fieldA, 10) || fieldB !== parseInt(fieldB, 10)) {
                fieldA = (a[_this._fieldNameSort] || "").toString().trim().toLowerCase();
                fieldB = (b[_this._fieldNameSort] || "").toString().trim().toLowerCase();
            }
            if (column.component === datepicker_grid_component_1.DatepickerGridComponent) {
                a = _this._dateService.convertNgDateStructToDate(fieldA);
                b = _this._dateService.convertNgDateStructToDate(fieldB);
                return _this._isSortAsc ? a - b : b - a;
            }
            if (fieldA < fieldB) {
                return _this._isSortAsc ? -1 : 1;
            }
            if (fieldA > fieldB) {
                return _this._isSortAsc ? 1 : -1;
            }
            return 0;
        });
    };
    GridComponent.prototype.isScrollBarVisible = function (callBackFn) {
        var _this = this;
        setTimeout(function () {
            var $element = $(_this._elRef.nativeElement).find('.grid-container');
            if ($element.length) {
                var scrollHeight = $element.get(0).scrollHeight;
                var height = $element.height();
                _this._isScrollbarVisible = $element.get(0) ? scrollHeight > height : false;
                if (_this._isScrollbarVisible && callBackFn)
                    callBackFn();
            }
        });
    };
    GridComponent.prototype.updateTransactions = function (row) {
        var _this = this;
        var idx = this.transactions.findIndex(function (t) { return t[_this.options.primaryKey] === row[_this.options.primaryKey]; });
        if (idx > -1) {
            if (row.transactionType === transaction_type_1.TransactionType.Deleterow && this.transactions[idx].transactionType === transaction_type_1.TransactionType.Addrow) {
                var rowIdx = this.rows.findIndex(function (r) { return row[_this.options.primaryKey] == r[_this.options.primaryKey]; });
                this.transactions.splice(idx, 1);
                this.rows.splice(rowIdx, 1);
            }
            else if (row.transactionType === transaction_type_1.TransactionType.Deleterow && this.transactions[idx].transactionType === transaction_type_1.TransactionType.Editrow)
                this.transactions[idx].transactionType = row.transactionType;
            else if (row.transactionType === transaction_type_1.TransactionType.Editrow && this.transactions[idx].transactionType === transaction_type_1.TransactionType.Addrow) {
                row.transactionType = transaction_type_1.TransactionType.Addrow;
                this.transactions[idx] = Object.assign({}, row);
            }
        }
        else
            this.transactions.push(Object.assign({}, row));
    };
    GridComponent.prototype.onViewUpdateHandler = function (rows, row) {
        this.copyOfRows = this._utilService.copyArray(rows);
        this.onViewUpdate.next(rows);
    };
    GridComponent.prototype.onRowUpdateHandler = function (newRow) {
        var _this = this;
        var oldRow = Object.assign({}, this.copyOfRows.find(function (r) { return r[_this.options.primaryKey] === newRow[_this.options.primaryKey]; }));
        this.onRowUpdate.next({
            newValue: newRow,
            oldValue: oldRow
        });
    };
    GridComponent.prototype.calcWidthByHeader = function (headerWidth) {
        if (!headerWidth)
            return;
        var headerWidthInt = parseInt(headerWidth);
        var index = headerWidth.indexOf(headerWidthInt.toString());
        var indicator = headerWidth.slice(index + headerWidthInt.toString().length, headerWidth.length);
        return (headerWidthInt / 2) + indicator;
    };
    GridComponent.prototype.setEditMode = function (editMode) {
        this.editMode = editMode;
    };
    GridComponent.prototype.updateCurrentRowValue = function (row) {
        var _this = this;
        var idx = this.rows.findIndex(function (row) { return row[_this.options.primaryKey] === _this.copyOfRow[_this.options.primaryKey]; });
        this.rows[idx] = Object.assign({}, row);
    };
    GridComponent.prototype.getVisibleColumns = function () {
        return this.columns.filter(function (c) { return !c.hidden; });
    };
    GridComponent.prototype.getTotalColumnsLength = function () {
        return this.getVisibleColumns().length;
    };
    GridComponent.prototype.validateCheckboxes = function () {
        var _this = this;
        this.tableForm.form.markAsDirty();
        setTimeout(function () {
            if (!_this.options.checkRequired)
                return;
            var anySelected = _this.rows.some(function (r) { return r.checkbox; });
            if (!anySelected) {
                _this.tableForm.form.setErrors({ 'checkboxError': true }, { emitEvent: true });
            }
            else {
                if (!_this.tableForm.form.hasError('checkboxError'))
                    return;
                var errors = _this.tableForm.form.errors;
                delete errors['checkboxError'];
                _this.tableForm.form.setErrors(errors.length ? errors : null, { emitEvent: true });
            }
        });
    };
    GridComponent.prototype.isLastVisibleColumn = function (column) {
        if (!this.columns.length)
            return;
        var lastVisibleColumn = this.columns[0];
        var index = this.columns.length;
        while (index > 0) {
            var c = this.columns[index - 1];
            if (!c.hidden) {
                lastVisibleColumn = c;
                break;
            }
            index--;
        }
        return (column.prop === lastVisibleColumn.prop);
    };
    GridComponent.prototype.firstVisibleColumn = function () {
        if (!this.columns.length)
            return;
        return this.columns.find(function (c) { return !c.hidden; });
    };
    GridComponent.prototype.ngOnInit = function () {
        this.copyOfRows = this._utilService.copyArray(this.rows);
        if (this.options.canSearch)
            this.searchService.init(this);
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.childGrids.changes
            .debounceTime(1000)
            .subscribe(function (childGrids) { return _this.searchService.childGridChangeEventHandler(childGrids); });
    };
    GridComponent.prototype.ngOnChanges = function (data) {
        this.transactions = new Array();
        this.copyOfRow = {};
        this.setEditMode(edit_mode_1.EditMode.None);
        if (data['rows']) {
            if (!this.hasRows()) {
                this.onAddRow();
            }
            this.copyOfRows = this._utilService.copyArray(this.rows);
            this.isScrollBarVisible();
        }
        if (this.options.checkBoxes)
            this.validateCheckboxes();
        this.tableForm.form.markAsUntouched();
        this.tableForm.form.markAsPristine();
    };
    GridComponent.prototype.checkboxEventHandler = function (value) {
        this.validateCheckboxes();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GridComponent.prototype, "parentId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", grid_options_1.GridOptions)
    ], GridComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], GridComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], GridComponent.prototype, "columns", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onViewFilter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onViewUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowEdit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onChildRowAdd", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onChildRowAdded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onChildRowUpdate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowAdded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "onRowExpanded", void 0);
    __decorate([
        core_1.ViewChildren(data_column_directive_1.DataTableColumnDirective),
        __metadata("design:type", core_1.QueryList)
    ], GridComponent.prototype, "editors", void 0);
    __decorate([
        core_1.ViewChildren(hierarchical_grid_component_1.HierarchicalGridComponent),
        __metadata("design:type", core_1.QueryList)
    ], GridComponent.prototype, "childGrids", void 0);
    __decorate([
        core_1.ViewChildren(column_filter_directive_1.ColumnFilterDirective),
        __metadata("design:type", core_1.QueryList)
    ], GridComponent.prototype, "filters", void 0);
    __decorate([
        core_1.ViewChildren(grid_cell_directive_1.GridCellDirective),
        __metadata("design:type", core_1.QueryList)
    ], GridComponent.prototype, "cells", void 0);
    __decorate([
        core_1.ViewChild('tableForm'),
        __metadata("design:type", forms_1.NgForm)
    ], GridComponent.prototype, "tableForm", void 0);
    __decorate([
        core_1.ViewChild('caretTemplate'),
        __metadata("design:type", core_1.TemplateRef)
    ], GridComponent.prototype, "caretTemplate", void 0);
    GridComponent = __decorate([
        core_1.Component({
            selector: 'star-grid',
            moduleId: module.id,
            styleUrls: ['grid.component.css'],
            templateUrl: 'grid.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            changes_service_1.ChangesService,
            date_service_1.DateService,
            search_1.SearchService,
            util_service_1.UtilService])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map