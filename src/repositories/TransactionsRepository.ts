import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationsDTO{
  title:string;
  value:number;
  type:"income"|"outcome";
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome} = this.transactions.reduce((aux:Balance, transaction:Transaction)=> {
      switch (transaction.type){
        case "income":
          aux.income += transaction.value;
          break;
        case "outcome":
          aux.outcome += transaction.value;
          break;
        default:
          break;
      }

      return aux;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = income - outcome;

    return { income, outcome, total};
  }

  public create({ title, value, type}: CreateTransationsDTO): Transaction {
    const newTransaction = new Transaction({title, value, type});

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
