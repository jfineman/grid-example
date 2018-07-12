import { Transaction } from './transaction';
import { ITransaction } from '../interface/itransaction';

export class Transactions<T extends ITransaction, TS>
{
    constructor(rows: ITransaction[]) {
        this.Transactions = rows.map((row: ITransaction) => {
            let transaction = new Transaction<ITransaction, TS>();
            transaction.row = row;
            transaction.PKID = row.Id;
            transaction.rowid = row.Id;
            transaction.type = row.transactionType;
            return transaction;
        });
    }
    public Transactions: Transaction<ITransaction, TS>[];
}