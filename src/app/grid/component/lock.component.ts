import { Component } from "@angular/core";
import { GridEditorBase } from "../contract/grid-editor-base";

@Component({
    selector: 'lock-grid',
    moduleId: module.id,
    template: `
        <div class="lock-container">
            <img (click)="onClick()" *ngIf="!myModel" class="unlock-false" src="/Images/unlock.png">
            <img (click)="onClick()" *ngIf="myModel" class="lock-true" src="/Images/lock.png">
        </div>

        <input 
            type="text" 
            hidden           
            [name]="name"            
            #model="ngModel"
            [(ngModel)]="myModel" >
    `,
    styles: [`
        :host .lock-container {
            margin-left: 12px;
            text-align: center;
            height: 21px;
        }
        :host .lock-container > img {
            height: 21px;
        }
    `]
})
export class LockComponent extends GridEditorBase {

    ngOnInit() {
        this.myModel = this.myModel === undefined ? false : this.myModel;
    }

    onClick() {
        this.setCellValue(!this.myModel);
        this.columnContext.formGroup.markAsDirty();
    }
}