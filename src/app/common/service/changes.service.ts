import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
declare var $: any;

@Injectable()
export class ChangesService implements CanDeactivate<any> {
    setDirtyState(bool: any) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem('dirtyState', bool);
        } else {
            $.cookie('dirtyState', bool);
        }
    }

    getDirtyState() {
        if (window.sessionStorage) {
            return window.sessionStorage.getItem('dirtyState') === "true";
        } else {
            return $.cookie('dirtyState') === "true";
        }
    }

    ifDirtyConfirmCancelChanges(isDirty?: boolean) {
        if (isDirty || this.getDirtyState()) {
            let leavepage = window.confirm("If you leave the current page now, any unsaved changes will be lost. Are you sure you want to leave the page?");
            if (leavepage) this.clear();
            return leavepage;
        }
        return true;
    }

    clear() {
        this.setDirtyState(false);
    }

    canDeactivate(component: any) {
        let canDeactivate = true;
        if (this.getDirtyState()) {
            canDeactivate = window.confirm("If you leave the current page now, any unsaved changes will be lost. Are you sure you want to leave the page?");
            if (canDeactivate) this.clear();
        }
        return canDeactivate;
    }

}

