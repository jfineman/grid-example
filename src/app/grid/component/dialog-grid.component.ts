import { Component, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComboItem } from "../../common/contract/combo-item";
import { NgForm } from "@angular/forms";
import { ListGroupComponent } from "../../common/component/list-group.component";
import { GridEditorBase } from "../contract/grid-editor-base";

@Component({
    selector: 'dialog-grid',
    templateUrl: './dialog-grid.component.html',
    styles: [`
        .input-group-addon{
            height:30px;
        }
    `]
})
export class DialogGridComponent extends GridEditorBase {
    modelRef: NgbModalRef;
    selection: any;

    constructor(private modalService: NgbModal) {
        super();
    }

    private onSelectItem(selection: ComboItem<any>[]) {
        this.selection = selection.map((combo: ComboItem<any>) => combo.Value).join(', ').trim();
    }

    private initListGroup() {
        let columnValue = this.columnContext.row[this.columnContext.column.prop];
        
        this.columnContext.column.data.forEach((d: ComboItem<any>) => d.isSelected = false);

        if (columnValue && this.columnContext.column.data) {
            columnValue.split(',').forEach((item: string) => {
                let match = this.columnContext.column.data.find((d: ComboItem<any>) => item.trim() == d.Value);
                if (match) match.isSelected = true;
            });
        }
    }

    open(content: any) {
        if (this.columnContext.column.readonly || this.columnContext.column.disabled) return;
        this.initListGroup();
        this.modelRef = this.modalService.open(content, { backdrop: 'static' });
    }

    save() {
        this.columnContext.formGroup.markAsDirty();
        this.myModel = this.selection;
        this.setCellValue(this.selection);
        this.modelRef.close();
    }
    cancel() {
        this.modelRef.dismiss();
    }
}
