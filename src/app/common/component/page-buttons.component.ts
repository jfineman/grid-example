import { Component, Input } from "@angular/core";
import { ResultService } from "../service/result.service";

@Component({
    selector: 'page-buttons',
    moduleId: module.id,
    template: `
        <div>
            <button type="button" class="btn btn-link" (click)="cancelFn()">Cancel</button>
            <button title="Click here to save changes"
                [ngClass]="saveNgClass" 
                [disabled]="saveDisabled"
                type="button" (click)="saveFn()" class="btn btn-primary">
                Save Changes
            </button>
        </div>
    `
})
export class PageButtonsComponent {
    @Input() cancelFn: Function;
    @Input() saveNgClass: Object;
    @Input() saveDisabled: boolean;
    @Input() saveFn: () => boolean;

    saving: boolean;

    constructor(private _resultsService: ResultService) { }


    private save() {
        this.saving = true;

        if (this.saveFn()) {

        }
    }
}