import { Directive, Input, HostListener } from "@angular/core";
import { EditorType } from "../enum/editor-type";

@Directive({
    selector: 'input[star-editor]',
})
export class EditorDirective {
    @Input('star-editor')
    editorType: EditorType = EditorType.text;

    @HostListener('keypress', ['$event'])
    onKeypress(event: KeyboardEvent) {
        if (event.charCode === 8)
            return true;
        if (this.editorType === EditorType.numeric)
            return (event.charCode >= 48 && event.charCode <= 57);
        if (this.editorType === EditorType.decimal) {
            return (event.charCode >= 48 && event.charCode <= 57) || event.charCode === 46 || event.charCode === 110 || event.charCode === 190;
        }
    }
}
