import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GridComponent } from "./component/grid.component";
import { DataTableColumnDirective } from "./directive/data-column.directive";
import { ColumnFilterDirective } from "./directive/column-filter.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckboxGridComponent } from "./component/checkbox-grid.component";
import { GridCellDirective } from "./directive/grid-cell-directive";
import { HierarchicalGridComponent } from './component/hierarchical-grid.component';
import { SearchService } from './service/search';
import "rxjs/Rx";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgbModule,
    ],
    declarations: [
        GridComponent,
        DataTableColumnDirective,
        ColumnFilterDirective,
        CheckboxGridComponent,
        GridCellDirective,
        HierarchicalGridComponent,
    ],
    providers: [
        SearchService
    ],
    exports: [
        GridComponent,
        DataTableColumnDirective
    ]

})
export class GridModule { }
