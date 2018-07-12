import { Component, Input, Output, ViewChild, OnDestroy, EventEmitter, OnInit, SimpleChange } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ComboItem } from '../../common/contract/combo-item';
import { NgbTypeaheadSelectItemEvent, NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { ColumnContext } from "../../grid/contract/column-context";
import { GridEditorBase } from "../contract/grid-editor-base";
declare var $: any;

@Component({
    selector: 'typeahead-grid',
    moduleId: module.id,
    templateUrl: "typeahead-grid.component.html",
    styleUrls: ['typeahead-grid.component.css']
})
export class TypeaheadGridComponent extends GridEditorBase {
    private _result: any;

    myModel: string;
    @ViewChild(NgbTypeahead) typeahead: NgbTypeahead;

    constructor() { super(); }

    onSelectItem(selected: ComboItem<any>) {
        this.setCellComboValue(selected);
    }

    onKeydown(e: KeyboardEvent) {
        super.onKeydown(e);

        if (this.columnContext.column.preventTab !== null && this.columnContext.column.preventTab === false) return;
    }

    displayFn = (item: any) => item && item.hasOwnProperty('Text') ? (<ComboItem<any>>item).Text : item;

    resultFn = (item: ComboItem<any>) => item.Text;

    search = (text$: Observable<string>) =>

        text$
            .debounceTime(100)
            .map((term: string )=> {

                if (!term) {
                    return this.columnContext.column.data;
                }

                this._result = this.columnContext.column.data.filter((v: any) => new RegExp(term.replace(/\\/g, ''), 'gi').test(v.Text));
                return this._result;
            });
}