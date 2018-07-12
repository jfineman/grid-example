import { Component, ViewChild, Input, ViewContainerRef } from "@angular/core";
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComboItem } from "../../common/contract/combo-item";
import { NgForm, FormGroup } from "@angular/forms";
import { ListGroupComponent } from "../../common/component/list-group.component";
import { GridEditorBase } from "../contract/grid-editor-base";
import { GridOptions } from "../contract/grid-options";
import { GridComponent } from "./grid.component";
import { ColumnContext } from "../contract/column-context";
import { ITransaction } from "../interface/itransaction";
import { IDialog } from "../interface/idialog";

@Component({
    selector: 'complex-dialog-content',
    templateUrl: './complex-dialog-content.component.html',
    styles: [`
        :host /deep/ input[type='checkbox'].custom-error{
            outline: 2px solid red;
        }
        :host /deep/ td:first-child div.ellipse {
            overflow: inherit !important;
        }
        :host /deep/ tr.locked-row {
            background-color: white;
            color: black;
        }
    `]
})
export class ComplexDialogContentComponent {
    @ViewChild(GridComponent) gridComponent: GridComponent;

    @Input() columnContext: ColumnContext;
    @Input() row: ITransaction;

    data: ITransaction[];
    selection: Array<ITransaction> = [];

    private _options: GridOptions = new GridOptions();

    constructor(public activeModal: NgbActiveModal) {

    }

    ngOnInit() {
        let checkboxOptions = <GridOptions>{
            checkBoxes: true,
            canAdd: false,
            canDelete: false,
            canEdit: false
        };

        Object.assign(this._options, checkboxOptions, (<IDialog>this.columnContext.column).options);

        this.selection = (this.columnContext.row[this.columnContext.column.id]);

        this.data = (<Array<ITransaction>>this.columnContext.column.data);

        this.data.forEach((row: any) => {
            row.checkbox = this.selection && this.selection.length ? this.selection.some((d: any) => d[this._options.primaryKey] === row[this._options.primaryKey]) : false;
        });
    }

    private onViewFilter(rows: ITransaction[]) {
        this.data = rows;
    }

    private save() {
        this.selection = this.selection.filter((sel: ITransaction) => sel.checkbox &&
            !this.data.some((data: ITransaction) => !data.checkbox && data[this._options.primaryKey] === sel[this._options.primaryKey]))

        this.selection = this.data.concat(this.selection).filter((d: ITransaction) => d.checkbox);
        this.columnContext.formGroup.markAsDirty();
        this.activeModal.close(this.selection);
    }
    private cancel() {
        this.activeModal.dismiss();
    }
}