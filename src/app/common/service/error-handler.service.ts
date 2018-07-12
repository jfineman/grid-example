import { ErrorHandler, Injectable, ApplicationRef } from "@angular/core";
import { ResultService } from "../service/result.service";
import { Subject } from "rxjs/Subject";
declare var $: any;

@Injectable()
export class MyErrorHandler implements ErrorHandler {
    constructor(private _resultService: ResultService) { }

    handleError(error: any) {
        this._resultService.errorObs.next(error);
        
        setTimeout(() => $(document).click()); //hack to trigger change detection in the app
        
        throw error;
    }
}