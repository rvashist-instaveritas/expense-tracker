import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions: Transaction[] = [];
  constructor() { }

  getTransactions() : Transaction[] {
    return this.transactions;
  }

  addTransaction(txn: Transaction) : void {
    this.transactions.push(txn);
  }

  removeTransaction(txnId: string) : void {
    this.transactions = this.transactions.filter((txn) => txn.id === txnId);
  }

  updateTransaction(updatedTxn: Transaction) : void {
    this.transactions = this.transactions.map((txn) => txn.id === updatedTxn.id ? updatedTxn : txn);
  }

  // Calculate total income
  getTotalIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  // Calculate total expenses
  getTotalExpenses(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  // Calculate balance
  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

}
