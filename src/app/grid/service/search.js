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
var http_1 = require("@angular/common/http");
var util_service_1 = require("../../common/service/util.service");
var combo_item_1 = require("../../common/contract/combo-item");
var result_service_1 = require("../../common/service/result.service");
var SearchService = /** @class */ (function () {
    function SearchService(_http, _utilService, _resultService) {
        this._http = _http;
        this._utilService = _utilService;
        this._resultService = _resultService;
        this.advancedSearchRowIds = [1];
        this.childSearchResults = [];
        this.searchResults = [];
    }
    SearchService.prototype.init = function (gridComponent) {
        this.gridComponent = gridComponent;
        this.initSearchColumns();
        this.resetSearch();
    };
    SearchService.prototype.childGridChangeEventHandler = function (childGrids) {
        if (childGrids && childGrids.length) {
            if (this.childSearchResults && this.childSearchResults.length) {
                this.highlightChildCells(childGrids);
            }
        }
    };
    SearchService.prototype.initSearchColumns = function () {
        this.parentColumns = this.gridComponent.columns.map(function (c) { return new combo_item_1.ComboItem(c.name, c.prop); });
        this.childColumns = this.gridComponent.options.childGrid ?
            (this.gridComponent.options.childGrid.columns.map(function (c) { return new combo_item_1.ComboItem(c.name, c.prop); })) : [];
        this.columnNamesCombo = this.parentColumns.concat(this.childColumns);
        this.columnNamesCombo.sort(function (a, b) {
            if (a.Text < b.Text) {
                return -1;
            }
            if (a.Text > b.Text) {
                return 1;
            }
            return 0;
        });
        this.columnNamesCombo.unshift(new combo_item_1.ComboItem('All', 'All'));
        this.searchColumn = this.columnNamesCombo[0].Text;
        this.searchColumnProp = this.columnNamesCombo[0].Value;
        this.childColumns = this.childColumns.filter(function (item) { return !!item.Text; });
        this.parentColumns = this.parentColumns.filter(function (item) { return !!item.Text; });
        this.columnNamesCombo = this.columnNamesCombo.filter(function (item) { return !!item.Text; });
    };
    SearchService.prototype.search = function ($event, searchTerm, searchColumn, criteria, rows) {
        var _this = this;
        if (searchTerm === void 0) { searchTerm = this.searchTerm; }
        if (searchColumn === void 0) { searchColumn = this.searchColumnProp; }
        if (rows === void 0) { rows = this._utilService.copyArray(this.gridComponent.copyOfRows); }
        var results;
        if (!$event || $event.keyCode == 13 || $event.which == 13) {
            this._resultService.loading = true;
            if (!searchTerm) {
                results = rows.slice();
                return results;
            }
            results = rows.filter(function (row) {
                if (searchColumn === 'All') {
                    var match_1 = false;
                    _this.parentColumns.forEach(function (combo) {
                        if (row.hasOwnProperty(combo.Value) && !!row[combo.Value]) {
                            if (_this.criteriaFn(criteria)(row[combo.Value], searchTerm)) {
                                _this.searchResults.push(new combo_item_1.ComboItem(combo.Value, row[_this.gridComponent.options.primaryKey]));
                                match_1 = true;
                            }
                        }
                    });
                    var anyChildMatches = row[_this.gridComponent.options.childGrid.prop].some(function (row, index, children) {
                        var childMatch = false;
                        _this.childColumns.forEach(function (combo) {
                            if (row.hasOwnProperty(combo.Value) && !!row[combo.Value])
                                if (_this.criteriaFn(criteria)(row[combo.Value], searchTerm)) {
                                    _this.childSearchResults.push(new combo_item_1.ComboItem(combo.Value, row[_this.gridComponent.options.childGrid.options.primaryKey]));
                                    childMatch = true;
                                }
                        });
                        return childMatch;
                    });
                    return match_1 || anyChildMatches;
                }
                return _this.searchRow(row, searchColumn, searchTerm, criteria);
            });
            return results;
        }
    };
    SearchService.prototype.criteriaFn = function (criteria) {
        switch (criteria) {
            case 'Start With':
                return function (prop, searchTerm) {
                    return prop.toString().toUpperCase().substring(0, searchTerm.length) === searchTerm.toUpperCase();
                };
            case 'Equal':
                return function (prop, searchTerm) {
                    return prop.toString().toUpperCase() == searchTerm.toUpperCase();
                };
            default:
            case 'Contain':
                return function (prop, searchTerm) {
                    return (prop.toString()).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1;
                };
        }
    };
    SearchService.prototype.searchRow = function (row, columnToSearch, searchTerm, criteria) {
        var _this = this;
        if (columnToSearch === void 0) { columnToSearch = this.searchColumnProp; }
        if (searchTerm === void 0) { searchTerm = this.searchTerm; }
        if (criteria === void 0) { criteria = 'Contain'; }
        if (row.hasOwnProperty(columnToSearch)) {
            if (!!row[columnToSearch] && this.criteriaFn(criteria)(row[columnToSearch], searchTerm)) {
                this.searchResults.push(new combo_item_1.ComboItem(columnToSearch, row[this.gridComponent.options.primaryKey]));
                return true;
            }
            return false;
        }
        else {
            return row[this.gridComponent.options.childGrid.prop]
                .some(function (row, index, children) {
                var match = false;
                if (!!row[columnToSearch] && _this.criteriaFn(criteria)(row[columnToSearch], searchTerm)) {
                    _this.childSearchResults.push(new combo_item_1.ComboItem(columnToSearch, row[_this.gridComponent.options.childGrid.options.primaryKey]));
                    match = true;
                }
                return match;
            });
        }
    };
    SearchService.prototype.basicSearch = function ($event) {
        if (!$event || $event.keyCode == 13 || $event.which == 13) {
            this.resetSearchResults();
            this.resetRowCollection(this.gridComponent.copyOfRows);
            this.gridComponent.rows = this.search($event);
            this.expandResults();
        }
    };
    SearchService.prototype.advancedSearch = function (advancedSearchRows) {
        var _this = this;
        this.gridComponent.rows = this._utilService.copyArray(this.gridComponent.copyOfRows);
        this.resetSearchResults();
        this.resetRowCollection(this.gridComponent.rows);
        advancedSearchRows.forEach(function (advancedSearch) {
            _this.gridComponent.rows = _this.search(undefined, advancedSearch.searchTerm, advancedSearch.columnProp, advancedSearch.searchCriteria, _this.gridComponent.rows);
        });
        this.expandResults();
    };
    SearchService.prototype.highlightChildCells = function (childGrids) {
        var _this = this;
        childGrids.forEach(function (child) {
            var childCells = child.gridComponent.cells;
            if (childCells.some(function (cell) { return !cell.highlighted; })) {
                _this.childSearchResults.forEach(function (combo) {
                    var cell = childCells.find(function (cell) { return combo.Text === cell.columnContext.column.prop && combo.Value === cell.columnContext.row[_this.gridComponent.options.childGrid.options.primaryKey]; });
                    if (cell)
                        cell.highlighted = true;
                });
            }
        });
    };
    SearchService.prototype.highlightParentCells = function (row) {
        var _this = this;
        var parentCells = this.gridComponent.cells;
        var searchResult = this.searchResults.filter(function (combo) { return combo.Value === row[_this.gridComponent.options.primaryKey]; });
        searchResult.forEach(function (result) {
            var cell = parentCells.find(function (cell) { return result.Text === cell.columnContext.column.prop && result.Value === cell.columnContext.row[_this.gridComponent.options.primaryKey]; });
            if (cell)
                cell.highlighted = true;
        });
    };
    SearchService.prototype.expandResults = function () {
        var _this = this;
        if (this.searchTerm)
            setTimeout(function () {
                var rowsLength = _this.gridComponent.rows.length;
                var i = 0;
                var intervalFunc = setInterval(function () {
                    if (i === rowsLength) {
                        clearInterval(intervalFunc);
                        _this._resultService.loading = false;
                        return;
                    }
                    var row = _this.gridComponent.rows[i];
                    if (row) {
                        row.expanded = true;
                        _this.highlightParentCells(row);
                    }
                    i++;
                }, 250);
                $('input, button, table *').one('click', function () {
                    clearInterval(intervalFunc);
                    _this._resultService.loading = false;
                });
            });
        else
            this._resultService.loading = false;
    };
    SearchService.prototype.addCriteria = function (advancedSearchRows) {
        this.advancedSearchRowIds.push(advancedSearchRows.length + 1);
    };
    SearchService.prototype.deleteCriteria = function (rowId) {
        var idx = this.advancedSearchRowIds.indexOf(rowId);
        this.advancedSearchRowIds.splice(idx, 1);
    };
    SearchService.prototype.onSearchColumnSelect = function (combo) {
        this.searchColumnProp = combo.Value;
    };
    SearchService.prototype.resetSearch = function () {
        this.resetSearchResults();
        this.resetRowCollection(this.gridComponent.copyOfRows);
        this.gridComponent.searchService.searchColumn = 'All';
        this.gridComponent.searchService.searchTerm = null;
    };
    SearchService.prototype.resetRowCollection = function (rows) {
        if (this.gridComponent.cells)
            this.gridComponent.cells.forEach(function (cell) {
                cell.highlighted = false;
                cell.columnContext.row.expanded = false;
            });
        if (this.gridComponent.childGrids)
            this.gridComponent.childGrids.forEach(function (child) {
                return child.gridComponent.cells.forEach(function (cell) { return cell.highlighted = false; });
            });
    };
    SearchService.prototype.resetSearchResults = function () {
        this.searchResults = [];
        this.childSearchResults = [];
    };
    SearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            util_service_1.UtilService,
            result_service_1.ResultService])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.js.map