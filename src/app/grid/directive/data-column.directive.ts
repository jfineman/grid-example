import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, OnInit, ElementRef } from '@angular/core';
import { ColumnContext } from "../contract/column-context";
import { IGridEditor } from "../interface/igrid-editor";
import { HierarchicalGridComponent } from "../component/hierarchical-grid.component";

@Directive({ selector: '[star-datatable-column]' })
export class DataTableColumnDirective implements OnInit {
    component: IGridEditor | HierarchicalGridComponent;
    
    @Input()
    private columnContext: ColumnContext;

    constructor(private _elRef: ElementRef,
        private _viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        if (this.columnContext.column.component)
            this.loadComponent();
    }

    private loadComponent() {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.columnContext.column.component);
        this._viewContainerRef.clear();

        let componentRef = this._viewContainerRef.createComponent(componentFactory);
        this.component = (<IGridEditor>componentRef.instance);
        this.component.columnContext = this.columnContext;
    }
}