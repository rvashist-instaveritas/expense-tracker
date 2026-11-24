import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  transaction: Transaction = {
    id: '',
    title: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: new Date().toISOString().substring(0, 10)
  };

  categories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Health',
    'Salary',
    'Business',
    'Investment',
    'Other'
  ];

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  addTransaction(): void {
    if (
      !this.transaction.title.trim() ||
      this.transaction.amount <= 0 ||
      !this.transaction.category ||
      !this.transaction.date
    ) {
      return;
    }

    const newTransaction: Transaction = {
      ...this.transaction,
      id: Date.now().toString()
    };

    this.transactionService.addTransaction(newTransaction);

    this.router.navigate(['/dashboard']);
  }

}