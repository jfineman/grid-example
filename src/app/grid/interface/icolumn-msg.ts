import { ITransaction } from "./itransaction";

export interface IColumnMsg {
    transaction: ITransaction;
    prop: string;
    name?: string;
    id?: string;
}