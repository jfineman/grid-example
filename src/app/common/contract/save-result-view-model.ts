export class SaveResult<T>
{
    constructor() {

    }
    public ViewModel: T;
    public IsSuccess: boolean;
    public Count: number;
    public PkId: number;
    public Messages: string[];

    //added
    public customMessage: string;
}