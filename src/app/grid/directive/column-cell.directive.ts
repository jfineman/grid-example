import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[star-datatable-cell-template]' })
export class DataTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) { };
}
