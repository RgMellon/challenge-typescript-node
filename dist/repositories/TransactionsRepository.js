"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.filterTypes = function (type) {
        if (type === void 0) { type = ''; }
        return this.transactions.filter(function (item) { return item.type === type; });
    };
    TransactionsRepository.prototype.getBalance = function () {
        var filterIncoming = this.filterTypes('income');
        var filterOutcoming = this.filterTypes('outcome');
        var sumIncome = filterIncoming.reduce(function (accumulator, total) { return accumulator + total.value; }, 0);
        var sumOutCome = filterOutcoming.reduce(function (accumulator, total) { return accumulator + total.value; }, 0);
        return {
            income: sumIncome,
            outcome: sumOutCome,
            total: sumIncome - sumOutCome,
        };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ type: type, value: value, title: title });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
