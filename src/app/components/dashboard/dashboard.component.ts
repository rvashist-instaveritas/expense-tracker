import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[] = [];
  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() : void {
    this.transactions = this.transactionService.getTransactions();
    this.balance = this.transactionService.getBalance();
    this.totalExpenses = this.transactionService.getTotalExpenses();
    this.totalIncome = this.transactionService.getTotalIncome();
  }
}
