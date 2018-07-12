import { Component, Input, ViewChild, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from "@angular/core";
import { ComboItem } from "../contract/combo-item";
import { NgForm } from "@angular/forms";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeWhile';
import { Subscription } from "rxjs/Subscription";
import { EditorType } from "../enum/editor-type";
declare var $: any;

@Component({
    selector: 'list-group',
    moduleId: module.id,
    templateUrl: "list-group.component.html",
    styleUrls: ['list-group.component.css'],
})
export class ListGroupComponent implements OnInit, OnChanges {
    private _fieldNameSort: string;
    private _isSortAsc: boolean;
    private _allSelected: boolean = true;

    formChange$: Subscription;
    oneSelected: boolean;
    init: boolean;
    selectionAnchor: ComboItem<any>;

    @Input() enableSelectAll: boolean = true;
    @Input() requiredMessage: string = 'Required';
    @Input() readonly: boolean;
    @Input() parent: NgForm;
    @Input() required: boolean;
    @Input() height: number;
    @Input() title: string;
    @Input() data: Array<ComboItem<any>>;

    @Input()
    get allSelected() {
        return this._allSelected;
    }
    set allSelected(value: boolean) {
        this._allSelected = value;
        this.allSelectedChange.emit(this._allSelected);
    }

    @Output() allSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() selected: EventEmitter<Array<ComboItem<any>>> = new EventEmitter<Array<ComboItem<any>>>();
    @ViewChild('form') listGroupForm: NgForm;


    ngOnInit() {
        this.setFormChangeObserver();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.data) return;

        if (this.allSelected || this.isAllSelected()) {
            this.selectAll();
            this.reset();
        }
        this.filterSelected();

        this.validate();

        if (changes['data']) this.reset();
    }

    private reset() {
        this.dirty.emit(false);
        this.listGroupForm.form.markAsPristine();
        this.listGroupForm.form.markAsUntouched();
        this.setFormChangeObserver();
    }

    private setFormChangeObserver() {
        if (this.formChange$) {
            this.formChange$.unsubscribe();
        }

        setTimeout(() =>
            this.formChange$ = this.listGroupForm.form.valueChanges
                .first(() => this.listGroupForm.form.dirty)
                .subscribe((changes: any) => {
                    this.dirty.emit(true);
                }), 1000);
    }

    private validate() {
        if (this.required) {
            this.oneSelected = this.data.some((item: ComboItem<any>) => item.isSelected);
        }
        if (!this.parent) return;

        if (this.required && !this.oneSelected) {
            this.parent.form.setErrors({ [this.title]: true }, { emitEvent: true });
        }
        else if (this.data.some((item: ComboItem<any>) => !!item.customError)) {
            this.parent.form.setErrors({ [this.title]: true }, { emitEvent: true });
        }
        else if (this.parent.form.hasError(this.title)) {
            let errors = this.parent.form.errors;
            delete errors[this.title];
            this.parent.form.setErrors(errors.length ? errors : null, { emitEvent: true });
        }
    }

    private isAllSelected() {
        this.allSelected = !this.data.some((item: ComboItem<any>) => !item.isSelected);
        return this.allSelected;
    }

    private selectRange(indexArr: Array<number>) {
        if (this.readonly) return;
        indexArr.sort();
        this.data.slice(indexArr[0], indexArr[1] + 1).forEach((item: ComboItem<any>) => {
            item.isSelected = true;
        });
        this.onListGroupClickEvt();
    }
    private onListGroupClickEvt() {
        if (this.parent) this.parent.form.markAsDirty();
        this.filterSelected();
        this.isAllSelected();
        this.validate();
    }

    private filterSelected() {
        if (!this.data) return;
        let filtered = this.data.filter((data: ComboItem<any>) => data.isSelected);
        this.selected.emit(filtered);
    }

    private shiftAnchor() {
        let arr = this.data.filter((item: ComboItem<any>) => item.isSelected);
        if (arr.length) this.selectionAnchor = arr[0];
        else this.selectionAnchor = null;
    }
    selectAll() {
        this.allSelected = true;
        this.data.forEach((item: ComboItem<any>) => {
            item.isSelected = true;
        });
    }
    deselectAll() {
        this.allSelected = false;
        this.data.forEach((item: ComboItem<any>) => {
            item.customError = null;
            item.isSelected = false;
        });
    }
    toggleSelectAll() {
        if (this.readonly) return;
        if (!this.allSelected) {
            this.selectAll();
            this.reset();
        }
        else {
            this.deselectAll();
            this.selectionAnchor = null;
        }
        this.onListGroupClickEvt();
    }
    selectOne($event: MouseEvent, item: ComboItem<any>, index: number) {
        if (this.readonly || $($event.target).is('input')) return;
        if ($event.shiftKey) {
            this.deselectAll();
            this.selectRange([this.data.indexOf(this.selectionAnchor), index]);
        }
        else if ($event.ctrlKey) {
            //don't deselect and maintain current anchor
        }
        else {
            this.deselectAll();
            this.selectionAnchor = item;
        }
        item.isSelected = true;
        this.listGroupForm.form.markAsDirty();
        this.onListGroupClickEvt();
    }
    selectAtLeastOne(item: ComboItem<any>) {
        if (this.readonly) return;

        item.isSelected = !item.isSelected;
        if (!this.selectionAnchor && item.isSelected) {
            this.selectionAnchor = item;
        }
        if (this.selectionAnchor && !item.isSelected) {
            this.shiftAnchor();
        }
        this.onListGroupClickEvt();
    }
}