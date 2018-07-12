import {
    Component,
    Injectable,
    Inject,
    QueryList
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../common/service/util.service';
import { ITransaction } from '../interface/itransaction';
import { ComboItem } from '../../common/contract/combo-item';
import { ResultService } from '../../common/service/result.service';
import { HierarchicalGridComponent } from '../component/hierarchical-grid.component';
import { GridCellDirective } from '../directive/grid-cell-directive';
// import { AdvancedSearchComponent } from '../../administration/mpds/component/advanced-search.component';
import { IColumn } from '../interface/icolumn';
import { GridComponent } from '../component/grid.component';
declare var $: any;

@Injectable()
export class SearchService {
    searchColumn: string;
    columnNamesCombo: any[];
    // advancedSearchRows: QueryList<AdvancedSearchComponent>;
    advancedSearchRowIds: number[] = [1];
    gridComponent: GridComponent;
    childSearchResults: ComboItem<number>[] = [];
    childColumns: any;
    searchResults: ComboItem<number>[] = [];
    parentColumns: any;
    searchColumnProp: any;
    searchTerm: any;

    constructor(private _http: HttpClient,
        private _utilService: UtilService,
        private _resultService: ResultService
    ) { }

    init(gridComponent: GridComponent) {
        this.gridComponent = gridComponent;
        this.initSearchColumns();
        this.resetSearch();
    }

    childGridChangeEventHandler(childGrids: QueryList<HierarchicalGridComponent>) {
        if (childGrids && childGrids.length) {
            if (this.childSearchResults && this.childSearchResults.length) {
                this.highlightChildCells(childGrids);
            }
        }
    }

    initSearchColumns() {
        this.parentColumns = this.gridComponent.columns.map((c: IColumn) => new ComboItem<string>(c.name, c.prop));
        this.childColumns = this.gridComponent.options.childGrid ?
            (this.gridComponent.options.childGrid.columns.map((c: IColumn) => new ComboItem<string>(c.name, c.prop))) : [];

        this.columnNamesCombo = [...this.parentColumns, ...this.childColumns];
        this.columnNamesCombo.sort((a: ComboItem<string>, b: ComboItem<string>) => {
            if (a.Text < b.Text) {
                return -1;
            }
            if (a.Text > b.Text) {
                return 1;
            }
            return 0;
        })
        this.columnNamesCombo.unshift(new ComboItem<string>('All', 'All'));
        this.searchColumn = this.columnNamesCombo[0].Text;
        this.searchColumnProp = this.columnNamesCombo[0].Value;

        this.childColumns = this.childColumns.filter((item: ComboItem<string>) => !!item.Text);
        this.parentColumns = this.parentColumns.filter((item: ComboItem<string>) => !!item.Text);
        this.columnNamesCombo = this.columnNamesCombo.filter((item: ComboItem<string>) => !!item.Text);
    }


    search($event: KeyboardEvent,
        searchTerm: string = this.searchTerm,
        searchColumn: string = this.searchColumnProp,
        criteria?: string,
        rows: ITransaction[] = this._utilService.copyArray(this.gridComponent.copyOfRows)): ITransaction[] {

        let results: ITransaction[];

        if (!$event || $event.keyCode == 13 || $event.which == 13) {
            this._resultService.loading = true;

            if (!searchTerm) {
                results = [...rows];
                return results;
            }

            results = rows.filter((row: ITransaction) => {
                if (searchColumn === 'All') {
                    let match = false;
                    this.parentColumns.forEach((combo: ComboItem<string>) => {
                        if (row.hasOwnProperty(combo.Value) && !!row[combo.Value]) {

                            if (this.criteriaFn(criteria)(row[combo.Value], searchTerm)) {
                                this.searchResults.push(new ComboItem<number>(combo.Value, row[this.gridComponent.options.primaryKey]));
                                match = true;
                            }
                        }
                    });

                    let anyChildMatches =
                        row[this.gridComponent.options.childGrid.prop].some((row: ITransaction, index: number, children: ITransaction[]) => {
                            let childMatch = false;

                            this.childColumns.forEach((combo: ComboItem<string>) => {
                                if (row.hasOwnProperty(combo.Value) && !!row[combo.Value])
                                    if (this.criteriaFn(criteria)(row[combo.Value], searchTerm)) {
                                        this.childSearchResults.push(new ComboItem<number>(combo.Value, row[this.gridComponent.options.childGrid.options.primaryKey]));
                                        childMatch = true;
                                    }
                            });
                            return childMatch;
                        });

                    return match || anyChildMatches;
                }

                return this.searchRow(row, searchColumn, searchTerm, criteria);
            });

            return results;
        }
    }

    criteriaFn(criteria: string): (prop: any, searchTerm: string) => boolean {
        switch (criteria) {
            case 'Start With':
                return (prop: any, searchTerm: string) => {
                    return prop.toString().toUpperCase().substring(0, searchTerm.length) === searchTerm.toUpperCase();
                }
            case 'Equal':
                return (prop: any, searchTerm: string) => {
                    return prop.toString().toUpperCase() == searchTerm.toUpperCase();
                }
            default:
            case 'Contain':
                return (prop: any, searchTerm: string) => {
                    return (prop.toString()).toUpperCase().indexOf(searchTerm.toUpperCase()) > -1;
                }
        }
    }


    searchRow(row: ITransaction, columnToSearch: string = this.searchColumnProp, searchTerm: string = this.searchTerm, criteria: string = 'Contain'): boolean {
        if (row.hasOwnProperty(columnToSearch)) {

            if (!!row[columnToSearch] && this.criteriaFn(criteria)(row[columnToSearch], searchTerm)) {
                this.searchResults.push(new ComboItem<number>(columnToSearch, row[this.gridComponent.options.primaryKey]));
                return true;
            }
            return false;

        } else {
            return row[this.gridComponent.options.childGrid.prop]
                .some((row: ITransaction, index: number, children: ITransaction[]) => {
                    let match = false;

                    if (!!row[columnToSearch] && this.criteriaFn(criteria)(row[columnToSearch], searchTerm)) {
                        this.childSearchResults.push(new ComboItem<number>(columnToSearch, row[this.gridComponent.options.childGrid.options.primaryKey]));
                        match = true;
                    }
                    return match;
                });
        }
    }

    basicSearch($event: KeyboardEvent) {
        if (!$event || $event.keyCode == 13 || $event.which == 13) {
            this.resetSearchResults();
            this.resetRowCollection(this.gridComponent.copyOfRows);
            this.gridComponent.rows = <ITransaction[]>this.search($event);
            this.expandResults();
        }
    }

    // advancedSearch(advancedSearchRows: QueryList<AdvancedSearchComponent>) {
    //     this.gridComponent.rows = this._utilService.copyArray(this.gridComponent.copyOfRows);
    //     this.resetSearchResults();
    //     this.resetRowCollection(this.gridComponent.rows);

    //     advancedSearchRows.forEach((advancedSearch: AdvancedSearchComponent) => {
    //         this.gridComponent.rows = (
    //             <ITransaction[]>this.search(undefined, advancedSearch.searchTerm,
    //                 advancedSearch.columnProp, advancedSearch.searchCriteria, this.gridComponent.rows));
    //     });
    //     this.expandResults();
    // }


    highlightChildCells(childGrids: QueryList<HierarchicalGridComponent>) {
        childGrids.forEach((child: HierarchicalGridComponent) => {
            let childCells = child.gridComponent.cells;
            if (childCells.some((cell: GridCellDirective) => !cell.highlighted)) {

                this.childSearchResults.forEach((combo: ComboItem<number>) => {
                    let cell = childCells.find((cell: GridCellDirective) => combo.Text === cell.columnContext.column.prop && combo.Value === cell.columnContext.row[this.gridComponent.options.childGrid.options.primaryKey]);
                    if (cell) cell.highlighted = true;
                })
            }
        });
    }

    highlightParentCells(row: ITransaction) {
        let parentCells = this.gridComponent.cells;
        let searchResult = this.searchResults.filter((combo: ComboItem<number>) => combo.Value === row[this.gridComponent.options.primaryKey]);
        searchResult.forEach((result: ComboItem<number>) => {
            let cell = parentCells.find((cell: GridCellDirective) => result.Text === cell.columnContext.column.prop && result.Value === cell.columnContext.row[this.gridComponent.options.primaryKey]);
            if (cell) cell.highlighted = true;
        })
    }


    expandResults() {
        if (this.searchTerm)
            setTimeout(() => {
                let rowsLength = this.gridComponent.rows.length;
                let i = 0;

                let intervalFunc = setInterval(() => {
                    if (i === rowsLength) {
                        clearInterval(intervalFunc);
                        this._resultService.loading = false;
                        return;
                    }

                    let row = <ITransaction>this.gridComponent.rows[i];
                    if (row) {
                        row.expanded = true;
                        this.highlightParentCells(row);
                    }

                    i++;
                }, 250);

                $('input, button, table *').one('click', () => {
                    clearInterval(intervalFunc);
                    this._resultService.loading = false;
                });
            })
        else
            this._resultService.loading = false;
    }

    // addCriteria(advancedSearchRows: QueryList<AdvancedSearchComponent>) {
    //     this.advancedSearchRowIds.push(advancedSearchRows.length + 1);
    // }
    deleteCriteria(rowId: number) {
        let idx = this.advancedSearchRowIds.indexOf(rowId);
        this.advancedSearchRowIds.splice(idx, 1);
    }

    onSearchColumnSelect(combo: ComboItem<string>) {
        this.searchColumnProp = combo.Value;
    }

    resetSearch() {
        this.resetSearchResults();
        this.resetRowCollection(this.gridComponent.copyOfRows);
        this.gridComponent.searchService.searchColumn = 'All';
        this.gridComponent.searchService.searchTerm = null;
    }

    resetRowCollection(rows: ITransaction[]) {
        if (this.gridComponent.cells)
            this.gridComponent.cells.forEach((cell: GridCellDirective) => {
                cell.highlighted = false;
                cell.columnContext.row.expanded = false;
            });

        if (this.gridComponent.childGrids)
            this.gridComponent.childGrids.forEach((child: HierarchicalGridComponent) =>
                child.gridComponent.cells.forEach((cell: GridCellDirective) => cell.highlighted = false));
    }

    resetSearchResults() {
        this.searchResults = [];
        this.childSearchResults = [];
    }

}