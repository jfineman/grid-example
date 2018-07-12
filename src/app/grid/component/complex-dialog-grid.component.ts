import { Component, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComboItem } from "../../common/contract/combo-item";
import { NgForm } from "@angular/forms";
import { ListGroupComponent } from "../../common/component/list-group.component";
import { GridEditorBase } from "../contract/grid-editor-base";
import { GridOptions } from "../contract/grid-options";
import { ComplexDialogContentComponent } from "./complex-dialog-content.component";
import { ITransaction } from "../interface/itransaction";
import { ColumnContext } from "../contract/column-context";
import { IDialog } from "../interface/idialog";

@Component({
    selector: 'complex-dialog-grid',
    templateUrl: './complex-dialog-grid.component.html',
    styles: [`
        .input-group-addon{
            height:30px;
        }
    `]
})
export class ComplexDialogGridComponent extends GridEditorBase {
    private modalRef: NgbModalRef;
    myModel: boolean;

    constructor(private modalService: NgbModal) {
        super();
    }

    open(columnContext: ColumnContext) {
        if (columnContext.column.readonly || columnContext.column.disabled) return;

        let dialogOptions: NgbModalOptions = { backdrop: 'static' };

        let size = (<IDialog>this.columnContext.column).size;

        if (size)
            dialogOptions.size = size;

        this.modalRef = this.modalService.open(ComplexDialogContentComponent, dialogOptions);
        this.modalRef.componentInstance.columnContext = columnContext;
        this.modalRef.componentInstance.row = columnContext.row;

        this.modalRef.result.then((result: Array<ITransaction>) => {
            this.columnContext.formGroup.markAsDirty();
            columnContext.row[columnContext.column.id] = result;
            columnContext.column.onValueChange(result, this);

        }, (dismissed) => {

        });
    };
}
