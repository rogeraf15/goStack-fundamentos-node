import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income'|'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    // if ( type !== 'income' &&  type !== 'outcome'){
    //   throw new Error("Tipo incorreto");
    // }

    if(!["income", "outcome"].includes(type)){
      throw new Error("Tipo incorreto");
    }

    if ( type === 'outcome' && value > total){
      throw new Error("Sem saldo!");
    }

    const newTransaction = this.transactionsRepository.create({title, value, type});

    return newTransaction;
  }
}

export default CreateTransactionService;
