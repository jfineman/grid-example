import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { GridModule } from "../grid/grid.module";
import { TypeaheadMenuComponent } from "./component/typeahead-menu.component";
import { ListGroupComponent } from "./component/list-group.component";
import { Datepicker } from "./component/datepicker.component";
import { MinMaxValueValidator } from "./directive/min-max-validator.directive";
import { EditorDirective } from "./directive/editor.directive";
import { ContentEditorComponent } from "./component/content-editor.component";
import { Equal } from "./directive/equal.directive";
import { GridSearchComponent } from '../grid/component/search.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        NgbModule,
        GridModule,
        HttpClientModule,
    ],
    declarations: [
        TypeaheadMenuComponent,
        ListGroupComponent,
        Datepicker,
        EditorDirective,
        Equal,
        GridSearchComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        NgbModule,
        GridModule,
        HttpClientModule,
        TypeaheadMenuComponent,
        ListGroupComponent,
        Datepicker,
        EditorDirective,
        Equal,
        GridSearchComponent
    ]
})
export class SharedModule { }
