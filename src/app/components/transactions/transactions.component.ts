import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];

  searchTerm = '';
  selectedType = 'all';

  constructor(private transactionService: TransactionService){}
  
  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() : void {
    this.transactions = this.transactionService.getTransactions();
  }

  // Filter transactions based on search and type
  get filteredTransactions(): Transaction[] {
    return this.transactions.filter(transaction => {

      const matchesSearch =
        transaction.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType =
        this.selectedType === 'all' ||
        transaction.type === this.selectedType;

      return matchesSearch && matchesType;
    });
  }

  get totalIncome(): number {
    return this.filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpenses(): number {
    return this.filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  deleteTransaction(id: string): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }
}