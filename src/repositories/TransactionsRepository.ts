import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private filterTypes(type = ''): Transaction[] {
    return this.transactions.filter(item => item.type === type);
  }

  public getBalance(): Balance {
    const filterIncoming = this.filterTypes('income');
    const filterOutcoming = this.filterTypes('outcome');

    const sumIncome = filterIncoming.reduce(
      (accumulator, total) => accumulator + total.value,
      0,
    );

    const sumOutCome = filterOutcoming.reduce(
      (accumulator, total) => accumulator + total.value,
      0,
    );

    return {
      income: sumIncome,
      outcome: sumOutCome,
      total: sumIncome - sumOutCome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
