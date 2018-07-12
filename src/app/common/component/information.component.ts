import { Component, Input } from "@angular/core";
import { SaveResult } from "../contract/save-result";
import { ResultService } from "../service/result.service";

@Component({
    selector: 'star-information',
    moduleId: module.id,
    templateUrl: 'information.component.html',
    styles: [`
        :host {
            margin-top: 10px;
            margin-bottom: 5px;
            margin-left: 15px;
            font-size: 14pt;
            font-weight: bold;
            display: block;
        }
    `]
})
export class InformationComponent {
    @Input() result: any;
    @Input() error: any;

    constructor() {

    }

}