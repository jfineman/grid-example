import { Component, Input, Output, ViewChild, ElementRef, Renderer, OnDestroy, forwardRef, EventEmitter } from '@angular/core';
import { FormControl, NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor, ValidatorFn } from '@angular/forms';

import { ComboItem } from '../../common/contract/combo-item';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { NgbTypeaheadSelectItemEvent, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ChangesService } from "../service/changes.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;

@Component({
    selector: 'typeahead-menu',
    moduleId: module.id,
    templateUrl: "typeahead-menu.component.html",
    styleUrls: ['typeahead-menu.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TypeaheadMenuComponent), multi: true }
    ]
})
export class TypeaheadMenuComponent implements ControlValueAccessor, OnInit {
    private _model: any;
    private _result: any;
    @Input() placeholder: string = '(Select)';
    @Input() disabled: boolean;
    @Input() readonly: boolean;
    @Input() required: boolean;
    @Input() name: string;
    @Input() data: Array<ComboItem<any>>;
    @Input() dirtyCheck: boolean = true;
    @Input() validators: ValidatorFn | ValidatorFn[];
    @Output() onModelChange: EventEmitter<ComboItem<any>> = new EventEmitter<ComboItem<any>>();
    @Output() onSelectedItem: EventEmitter<ComboItem<any>> = new EventEmitter<ComboItem<any>>();
    @Output() onConfirmDiscardChanges: EventEmitter<ComboItem<any>> = new EventEmitter<ComboItem<any>>();

    @ViewChild(NgModel) ngModel: NgModel;
    @ViewChild(NgbTypeahead) typeahead: NgbTypeahead;

    constructor(private _changesService: ChangesService) { }

    ngOnInit(): void {
        this.ngModel.control.setValidators(this.validators);
    }

    propagateChange: any = () => { };

    writeValue(value: any) {
        this._model = value;
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {

    }

    onSelectItem(selected: NgbTypeaheadSelectItemEvent) {
        if (this.dirtyCheck) {
            let isDirty = this._changesService.getDirtyState();

            if (this._changesService.ifDirtyConfirmCancelChanges()) {
                this.setComboValue(selected);
                
                if (isDirty)
                    this.onConfirmDiscardChanges.emit(selected.item);

            } else {
                selected.preventDefault();
            }

        } else {
            this.setComboValue(selected);
        }
    }

    private setComboValue(selected: NgbTypeaheadSelectItemEvent) {
        this.onSelectedItem.emit(selected.item);
        this.typeahead.writeValue(selected.item.Text);
        this.propagateChange(selected.item.Text);
    }

    displayFn = (item: any) => item.hasOwnProperty('Text') ? (<ComboItem<any>>item).Text : item;

    resultFn = (item: ComboItem<any>) => item.Text;

    search = (text$: Observable<string>) =>

        text$
            .debounceTime(200)
            .map(term => {
                if (!term) return this.data;

                this._result = this.data.filter(v => new RegExp(term.replace(/\\/g, ''), 'gi').test(v.Text));
                return this._result;
            });
}