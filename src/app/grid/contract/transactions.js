"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = require("./transaction");
var Transactions = /** @class */ (function () {
    function Transactions(rows) {
        this.Transactions = rows.map(function (row) {
            var transaction = new transaction_1.Transaction();
            transaction.row = row;
            transaction.PKID = row.Id;
            transaction.rowid = row.Id;
            transaction.type = row.transactionType;
            return transaction;
        });
    }
    return Transactions;
}());
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.js.map