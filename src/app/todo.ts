import { ITransaction } from "./grid/interface/itransaction";

export class Todo implements ITransaction {
    Id: any;
    parentId?: any;
    transactionType: string;
    checkbox?: boolean;
    expanded?: boolean;
    
    userId: number;
    id: number;
    title: string;
    complete: boolean;
}