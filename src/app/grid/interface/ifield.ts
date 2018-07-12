import { IColumn } from "./icolumn";
import { EditorType } from "../../common/enum/editor-type";

export interface IField extends IColumn {
    minlength?: string;
    maxlength?: string;
    min?: number;
    max?: number;
    pattern?: string;
    editorType?: EditorType;
}