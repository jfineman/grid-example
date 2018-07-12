export class ComboItem<T> {
    public customError?: string;
    public Value: T;
    public Text: string;
    public isSelected?: boolean;

    constructor(_text: string, _value: T, ) {
        this.Text = _text;
        this.Value = _value;
    }
}