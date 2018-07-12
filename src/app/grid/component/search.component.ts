import { Component, Input } from "@angular/core";
import { GridComponent } from "./grid.component";

@Component({
    selector: 'grid-search',
    moduleId: module.id,
    template: `
          <div *ngIf="gridComponent.options.canSearch" class="row form-group">
            <div class="col-md-6">
                <typeahead-menu 
                    name="search-column"                  
                    [(ngModel)]="gridComponent.searchService.searchColumn" 
                    [data]="gridComponent.searchService.columnNamesCombo"
                    (onSelectedItem)="gridComponent.searchService.onSearchColumnSelect($event)" >
                </typeahead-menu>
            </div>
        
            <div class="col-md-6">  
                <div class="input-group">
                    <input (keyup)="gridComponent.searchService.basicSearch($event)" name="search-term" [(ngModel)]="gridComponent.searchService.searchTerm" type="text" class="form-control" [style.border-right]="'0'">
                    <div (click)="gridComponent.searchService.basicSearch()" class="input-group-addon" [style.height.px]="'30'">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div> 
    `
})
export class GridSearchComponent {
    @Input() gridComponent: GridComponent;
}