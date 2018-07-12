import { Injectable } from "@angular/core";
import { SaveResult } from "../contract/save-result-view-model";
import { Subject } from "rxjs/Subject";

export interface IResult {
    result: any;
    state: string;
}

@Injectable()
export class ResultService {
    loading: boolean;
    result: any; 
    errorObs: Subject<any> = new Subject<any>();

    constructor() { }

    clear() {
        this.result = null;
        this.errorObs.next(null);
    }
}