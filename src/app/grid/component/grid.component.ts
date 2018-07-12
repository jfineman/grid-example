import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, QueryList, ViewChildren, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { ITransaction } from "../interface/itransaction";
import { EditMode } from "../enum/edit-mode";
import { TransactionType } from "../const/transaction-type";
import { GridOptions } from "../contract/grid-options";
import { DataTableColumnDirective } from "../directive/data-column.directive";
import { IColumn } from "../interface/icolumn";
import { IGridEditor } from "../interface/igrid-editor";
import { ColumnFilterDirective } from "../directive/column-filter.directive";
import { DatepickerGridComponent } from "./datepicker-grid.component";
import { DateService } from "../../common/service/date.service";
import { ColumnContext } from "../contract/column-context";
import { CheckboxGridComponent } from "./checkbox-grid.component";
import { HierarchicalGridComponent } from "./hierarchical-grid.component";
import { GridCellDirective } from "../directive/grid-cell-directive";
import { RowUpdateValuePair } from "../contract/row-update-value-pair";
import { SearchService } from '../service/search';
import { UtilService } from '../../common/service/util.service';
declare var $: any;

@Component({
    selector: 'star-grid',
    styleUrls: ['./grid.component.css'],
    templateUrl: './grid.component.html'
})
export class GridComponent implements OnChanges {
    private _oneCheckboxSelected: boolean;
    private _selectedRowKey: number;
    private _fieldNameSort: string;
    private _isSortAsc: boolean = false;
    private _rows: ITransaction[];
    private _columns: IColumn[] = [];
    private _columnHeaders: IColumn[] = [];
    private _isScrollbarVisible: boolean;
    transactions: Array<ITransaction> = new Array<ITransaction>();
    copyOfRow: ITransaction = {} as ITransaction;
    copyOfRows: ITransaction[] = [];
    newRow: ITransaction = { Id: 0, transactionType: TransactionType.Addrow };
    editMode: EditMode = EditMode.None;
    saving: boolean;

    @Input()
    parentId: number | string;

    @Input()
    options: GridOptions = new GridOptions();

    @Input()
    set rows(value: Array<ITransaction>) {
        this._rows = value;
    }
    get rows() {
        return this._rows;
    }

    @Input()
    set columns(val: IColumn[]) {
        this._columns = val;

        if (!this._columns || !this.columns.length) throw 'No columns are set for the grid!';

        if (this.options.childGrid && !this.columns.some((c: IColumn) => c.prop === 'caret')) {
            this.columns.unshift(<IColumn>{
                name: '',
                prop: 'caret',
                width: '45px',
                notSortable: true,
                customTemplate: this.caretTemplate
            });
        }

        if (this.options.checkBoxes && !this.columns.some((c: IColumn) => c.prop === 'checkbox')) {
            this.columns.unshift(<IColumn>{
                name: '',
                prop: 'checkbox',
                width: '35px',
                component: CheckboxGridComponent
            });
        }

        this.options.groupHeader = this.columns.some((columns: IColumn) => !!columns.header);

        if (this.options.groupHeader) {
            this._columns.forEach((columns: IColumn) => {
                if (!this._columnHeaders.find((ch: IColumn) => columns.header === ch.header) || !columns.header)
                    this._columnHeaders.push(columns);
            })
        }

        if (!this.options.defaultColumnSort) {
            this.options.defaultColumnSort = this.firstVisibleColumn();
        }
    }
    get columns(): IColumn[] {
        return this._columns;
    }

    @Output()
    onViewFilter: EventEmitter<ITransaction[]> = new EventEmitter<ITransaction[]>();

    @Output()
    onViewUpdate: EventEmitter<ITransaction[]> = new EventEmitter<ITransaction[]>();

    @Output()
    onRowUpdate: EventEmitter<RowUpdateValuePair> = new EventEmitter<RowUpdateValuePair>();

    @Output()
    onRowSelection: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onRowEdit: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onRowAdd: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onChildRowAdd: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onChildRowAdded: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onChildRowUpdate: EventEmitter<RowUpdateValuePair> = new EventEmitter<RowUpdateValuePair>();

    @Output()
    onRowAdded: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

    @Output()
    onRowExpanded: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ViewChildren(DataTableColumnDirective) editors: QueryList<DataTableColumnDirective>;
    @ViewChildren(HierarchicalGridComponent) childGrids: QueryList<HierarchicalGridComponent>;
    @ViewChildren(ColumnFilterDirective) filters: QueryList<ColumnFilterDirective>;
    @ViewChildren(GridCellDirective) cells: QueryList<GridCellDirective>;

    @ViewChild('tableForm') tableForm: NgForm;
    @ViewChild('caretTemplate') caretTemplate: TemplateRef<any>;

    constructor(
        private _elRef: ElementRef,
        private _dateService: DateService,
        public searchService: SearchService,
        private _utilService: UtilService) { }

    getOriginalColumnValueBy(rowId: number | string, columnName: string) {
        let row = this.copyOfRows.find((row: ITransaction) => row[this.options.primaryKey] === rowId);
        return row[columnName];
    }

    getColumnValueBy(rowId: number | string, columnName: string) {
        let row = this.rows.find((row: ITransaction) => row[this.options.primaryKey] === rowId);
        return row[columnName];
    }

    getCellBy(rowId: number | string, columnName: string): GridCellDirective {
        if (!this.cells || !this.cells.length) return;

        let cellDirective = this.cells.find((cell: GridCellDirective) =>
            cell.columnContext.row[this.options.primaryKey] === rowId && cell.columnContext.column.prop === columnName);

        return cellDirective;
    }

    getEditorComponentBy(rowId: number | string, columnName: string): IGridEditor {
        if (!this.editors || !this.editors.length) return;

        let columnDirective = this.editors.find((editor: DataTableColumnDirective) =>
            editor.component &&
            editor.component.columnContext.row[this.options.primaryKey] === rowId && editor.component.columnContext.column.prop === columnName);

        return columnDirective ? <IGridEditor>columnDirective.component : null;
    }

    getChildGridBy(parentId: number | string): GridComponent {
        if (!this.childGrids || !this.childGrids.length) return;

        let child = this.childGrids.find((childGrid: HierarchicalGridComponent) =>
            childGrid.columnContext.parentId === parentId);

        return child ? child.gridComponent : null;
    }

    checkForChildlessRows(childRowCollectionPropertyName: string): boolean {
        if (!this.rows || !this.rows.length) return;

        return this.rows
            .filter((row: ITransaction) => row.transactionType !== TransactionType.Deleterow)
            .some((row: ITransaction) => !row[childRowCollectionPropertyName] || !row[childRowCollectionPropertyName].length
                || row[childRowCollectionPropertyName].every((child: ITransaction) => child.transactionType === TransactionType.Deleterow));
    }

    anyChildTransactions() {
        return this.childGrids ? this.childGrids
            .some((childGrid: HierarchicalGridComponent) => childGrid.gridComponent.transactions.length > 0) : false;
    }

    getEditorFormControlBy(rowId: number | string, columnName: string): FormControl {
        let editor = this.getEditorComponentBy(rowId, columnName);
        return editor && editor.ngModel ? editor.ngModel.control : null;
    }

    save() {
        if (!this.rows.length) return;

        if (this.childGrids)
            this.childGrids
                .forEach((child: HierarchicalGridComponent) => child.gridComponent.save());

        this.transactions = [];
        let i = this.rows.length - 1;

        while (i > -1) {
            switch (this.rows[i].transactionType) {
                case TransactionType.Deleterow:
                    this.rows.splice(i, 1);
                    break;
                default:
                    this.rows[i].transactionType = undefined;
            }
            i--;
        }

        if (this.options.canSearch)
            this.searchService.resetSearch();

        this.tableForm.form.markAsUntouched();
        this.tableForm.form.markAsPristine();
        this.setEditMode(EditMode.Saved);
        // this.sortGrid();
    }

    hasRows() {
        return this.rows ?
            this.rows.some((row: ITransaction) => {
                return row.transactionType !== TransactionType.Deleterow
            })
            : false;
    }

    private expandRow($event: MouseEvent, row: ITransaction) {
        $event.stopPropagation();
        row.expanded = !row.expanded;

        if (row.expanded) {
            setTimeout(() => {
                let target = $event.target;
                let closestTd = $(target).closest('tr');
                let child = $(closestTd).next('.child-row')[0];

                let isInVisible = ($(child).offset().top - $('.grid-container:first').offset().top) + $(child).height() > $('.grid-container:first').height();

                if (isInVisible)
                    child.scrollIntoView(false);
            });

            this.onRowExpanded.next($event);
        }
    }

    cancel() {
        this.tableForm.form.markAsPristine();

        for (let name in this.tableForm.form.controls) {
            this.tableForm.form.controls[name].setErrors(null);
        }

        if (this.editMode === EditMode.Edit) {
            this.setEditMode(EditMode.None)
            this.updateCurrentRowValue(this.copyOfRow);
        }
        if (this.editMode === EditMode.Add) {
            this.setEditMode(EditMode.None)
            this.newRow = this.copyOfRow;
        }
        this.copyOfRow = {} as ITransaction;
    }
    private done() {
        this.tableForm.form.markAsPristine();

        this.setEditMode(EditMode.None);
        this.copyOfRows = this._utilService.copyArray(this.rows);
        this.copyOfRow = {} as ITransaction;
    }

    deleteChildRows(parentRow: ITransaction) {
        parentRow.expanded = true;

        setTimeout(() => {
            let childGrid = this.getChildGridBy(parentRow[this.options.primaryKey]);
            if (childGrid && childGrid.rows) {
                childGrid.rows
                    .filter((r: ITransaction) => r.transactionType != TransactionType.Deleterow)
                    .forEach((r: ITransaction) => childGrid.deleteRow(null, r));
            }
        });
    }

    deleteRow(clickEvent: MouseEvent, row: ITransaction) {
        if (row.transactionType === TransactionType.Deleterow) return;

        if (clickEvent) clickEvent.stopPropagation();

        if (!this.options.canDeleteRow || this.options.canDeleteRow(row)) {
            row.transactionType = TransactionType.Deleterow;
            this.updateTransactions(row);
            this.onViewUpdateHandler(this.rows, row);
            this.onRowUpdateHandler(row);
            this.done();

            if (this.options.childGrid) {
                this.deleteChildRows(row);
            }
        }
    }
    onAddRow() {
        if (!this.options.canAdd) return;

        this.setEditMode(EditMode.Add)
        this.generateNewId();

        this.copyOfRow = Object.assign({}, this.newRow);
        this.onRowAdd.next(this.newRow);
    }

    private generateNewId() {
        let newid = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            let currentRow = Math.abs(this.transactions[i][this.options.primaryKey]);
            if (currentRow > newid) newid = currentRow;
        }

        this.newRow[this.options.primaryKey] = this.newRow.Id = -(newid + 1);
    }

    private selectRow(row: ITransaction) {
        this._selectedRowKey = row[this.options.primaryKey];
        this.onRowSelection.next(row);
    }

    public setRowInEditMode(row: ITransaction) {
        this.cancel();
        this.onEditRow(row);
    }

    private onEditRow(row: ITransaction) {
        if (this.options.rowSelector
            && this.editMode !== EditMode.Edit
            && this._selectedRowKey !== row[this.options.primaryKey]) {

            this.selectRow(row);
            return;
        }

        if (!this.options.canEdit) return;

        if (row.transactionType === TransactionType.Deleterow) return;

        if (this.options.isRowEditable && !this.options.isRowEditable(row)) return;

        if (this.editMode === EditMode.None || this.editMode === EditMode.Saved) {
            this._selectedRowKey = null;
            this.setEditMode(EditMode.Edit)
            this.tableForm.form.markAsTouched();

            row.Id = row[this.options.primaryKey];
            this.onRowEdit.next(row);
            this.copyOfRow = Object.assign({}, row);
        }
    }
    private updateValue() {
        let row: ITransaction;
        if (this.tableForm.form.pristine) return;
        switch (this.editMode) {
            case EditMode.Add:
                this.rows.push(this.newRow);

                row = this.newRow;
                this.onRowAdded.next(row);
                this.newRow = Object.assign({}, this.copyOfRow);

                this.isScrollBarVisible(() => $('.grid-container:first > table > tbody > tr:last-child')[0].scrollIntoView());
                break;

            case EditMode.Edit:
                row = this.rows.find((row: ITransaction) => row[this.options.primaryKey] === this.copyOfRow[this.options.primaryKey]);
                row.transactionType = TransactionType.Editrow;
                this.updateCurrentRowValue(row);
                break;
        }
        this.updateTransactions(row);
        this.onViewUpdateHandler(this.rows, row);
        this.onRowUpdateHandler(row);
        this.done();
    }

    private filterGrid() {
        let filters = this.filters.toArray();
        let results: ITransaction[] = [...this.copyOfRows];

        if (!filters.length || !results.length) return;

        filters.forEach((f: ColumnFilterDirective) => {
            results = Object.assign([], results.filter((r: ITransaction) => new RegExp(f._elementRef.nativeElement.value.replace(/\\/g, ''), 'gi')
                .test(r[f.fieldName])));
        })

        this.rows = [...results];

        this.onViewFilter.next(this.rows);

        this.isScrollBarVisible();
    }

    sortGrid(column: IColumn = this.options.defaultColumnSort, isSortOn: boolean = true, ) {
        if (!this.options.canSort || !isSortOn || column.notSortable) return;

        this._isSortAsc = this._fieldNameSort !== column.prop ? true : !this._isSortAsc;
        this._fieldNameSort = column.prop;

        return this.rows.sort((a: any, b: any) => {
            let fieldA = a[this._fieldNameSort] || "";
            let fieldB = b[this._fieldNameSort] || "";

            //not an integer
            if (fieldA !== parseInt(fieldA, 10) || fieldB !== parseInt(fieldB, 10)) {
                fieldA = (a[this._fieldNameSort] || "").toString().trim().toLowerCase();
                fieldB = (b[this._fieldNameSort] || "").toString().trim().toLowerCase();
            }

            if (column.component === DatepickerGridComponent) {
                a = this._dateService.convertNgDateStructToDate(fieldA);
                b = this._dateService.convertNgDateStructToDate(fieldB);
                return this._isSortAsc ? a - b : b - a;
            }

            if (fieldA < fieldB) {
                return this._isSortAsc ? -1 : 1;
            }
            if (fieldA > fieldB) {
                return this._isSortAsc ? 1 : -1;
            }
            return 0;
        });
    }
    private isScrollBarVisible(callBackFn?: Function) {
        setTimeout(() => {
            let $element = $(this._elRef.nativeElement).find('.grid-container');

            if ($element.length) {
                let scrollHeight = $element.get(0).scrollHeight;
                let height = $element.height();
                this._isScrollbarVisible = $element.get(0) ? scrollHeight > height : false;

                if (this._isScrollbarVisible && callBackFn) callBackFn();
            }
        })
    }

    private updateTransactions(row: ITransaction) {
        let idx = this.transactions.findIndex((t: ITransaction) => t[this.options.primaryKey] === row[this.options.primaryKey]);
        if (idx > -1) {
            if (row.transactionType === TransactionType.Deleterow && this.transactions[idx].transactionType === TransactionType.Addrow) {
                let rowIdx = this.rows.findIndex((r: ITransaction) => row[this.options.primaryKey] == r[this.options.primaryKey]);
                this.transactions.splice(idx, 1);
                this.rows.splice(rowIdx, 1);
            }
            else if (row.transactionType === TransactionType.Deleterow && this.transactions[idx].transactionType === TransactionType.Editrow)
                this.transactions[idx].transactionType = row.transactionType;
            else if (row.transactionType === TransactionType.Editrow && this.transactions[idx].transactionType === TransactionType.Addrow) {
                row.transactionType = TransactionType.Addrow;
                this.transactions[idx] = Object.assign({}, row);
            }
        } else
            this.transactions.push(Object.assign({}, row));
    }

    private onViewUpdateHandler(rows: ITransaction[], row: ITransaction) {
        this.copyOfRows = this._utilService.copyArray(rows);
        this.onViewUpdate.next(rows);
    }

    private onRowUpdateHandler(newRow: ITransaction) {
        let oldRow = Object.assign({}, this.copyOfRows.find((r: ITransaction) => r[this.options.primaryKey] === newRow[this.options.primaryKey]));

        this.onRowUpdate.next({
            newValue: newRow,
            oldValue: oldRow
        });
    }

    private calcWidthByHeader(headerWidth: string) {
        if (!headerWidth) return;
        let headerWidthInt = parseInt(headerWidth);
        let index = headerWidth.indexOf(headerWidthInt.toString());
        let indicator = headerWidth.slice(index + headerWidthInt.toString().length, headerWidth.length);

        return (headerWidthInt / 2) + indicator;
    }

    private setEditMode(editMode: EditMode) {
        this.editMode = editMode;
    }

    private updateCurrentRowValue(row: ITransaction) {
        let idx = this.rows.findIndex((row: ITransaction) => row[this.options.primaryKey] === this.copyOfRow[this.options.primaryKey]);
        this.rows[idx] = Object.assign({}, row);
    }

    private getVisibleColumns(): IColumn[] {
        return this.columns.filter((c: IColumn) => !c.hidden);
    }

    private getTotalColumnsLength() {
        return this.getVisibleColumns().length;
    }

    private validateCheckboxes() {
        this.tableForm.form.markAsDirty();

        setTimeout(() => {

            if (!this.options.checkRequired) return;

            let anySelected = this.rows.some((r: ITransaction) => r.checkbox);

            if (!anySelected) {
                this.tableForm.form.setErrors({ 'checkboxError': true }, { emitEvent: true });

            } else {
                if (!this.tableForm.form.hasError('checkboxError')) return;

                let errors = this.tableForm.form.errors;
                delete errors['checkboxError'];
                this.tableForm.form.setErrors(errors.length ? errors : null, { emitEvent: true });
            }
        });

    }

    private isLastVisibleColumn(column: IColumn) {
        if (!this.columns.length) return;

        let lastVisibleColumn: IColumn = this.columns[0];
        let index: number = this.columns.length;

        while (index > 0) {
            var c = this.columns[index - 1];

            if (!c.hidden) {
                lastVisibleColumn = c;
                break;
            }
            index--;
        }
        return (column.prop === lastVisibleColumn.prop);
    }

    private firstVisibleColumn(): IColumn {
        if (!this.columns.length) return;

        return this.columns.find((c: IColumn) => !c.hidden)
    }

    ngOnInit() {
        this.copyOfRows = this._utilService.copyArray(this.rows);

        if (this.options.canSearch)
            this.searchService.init(this);
    }

    ngAfterViewInit() {
        this.childGrids.changes
            .subscribe((childGrids: QueryList<HierarchicalGridComponent>) => this.searchService.childGridChangeEventHandler(childGrids));
    }

    ngOnChanges(data: SimpleChanges) {
        this.transactions = new Array<ITransaction>();
        this.copyOfRow = {} as ITransaction;
        this.setEditMode(EditMode.None)

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
    }

    private checkboxEventHandler(value: boolean) {
        this.validateCheckboxes();
    }
}