import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';
import { LabelTextComponent } from '../graphics/label-text/label-text.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GenericsService } from '../services/generics.service';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, RouterLink, FontAwesomeModule, FormsModule, NgxPaginationModule],
  templateUrl: './transaction-liste.component.html',
  styleUrl: './transaction-liste.component.css'
})
export class TransactionListeComponent implements OnInit{

   transactions: Transaction[] = [];
    selectedTransaction: any;
    filteredTransactions: Observable<Transaction[]> = of([]);
  searchTerm: string = '';

  page: number = 1; 

  // Configuration des labels de pagination en français
  paginationLabels = {
    previousLabel: 'Préc.',
    nextLabel: 'Suiv.',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `Vous êtes sur la page`
  };

    faTrash= faTrash;
      faPen = faPen;
      faEye= faEye;
      dciCritere: string = '';
      nomPosteCritere: string = '';

      
  
    constructor(private transactionService: TransactionService, private router: Router, private genericsService: GenericsService) { }
  
    ngOnInit() {
       this.loadDataSource ();

    }

    loadDataSource (){

      this.transactionService.getAllTransaction().subscribe(data => {
  
        this.transactions = data;

        this.filteredTransactions = of([...this.transactions]);
      });
  
    }

    rechercherTransaction() {
      if(this.genericsService.isAtLeastOneFieldNotEmpty(this.dciCritere, this.nomPosteCritere)){
        this.transactionService.rechercherTransaction(this.dciCritere, this.nomPosteCritere).subscribe(data => {
  

          this.filteredTransactions = of([...data]);
        });
      }else{
        this.filteredTransactions = of([...this.transactions]);
      }
      
    
    }
      

   /* filterTransactions(): void {
      
      if(this.searchTerm && this.searchTerm.length > 1){
                this.filteredTransactions = of(this.searchTerm).pipe(
                   debounceTime(2000), 
                  switchMap((value) => this.fetchTransactions(value)), // Fetch options from the backend
                  catchError((err) => {
                    console.error('Error fetching options', err);
                    return of([]); // Return an empty array in case of error
                  }));
      }
      
    }


  fetchTransactions(query: string, ): Observable<Transaction[]> {
   if(typeof query === 'string' && query && query.trim() !== ''){
        return this.transactionService.rechercherTransaction(null, query);
    }else  {
      return of([...this.transactions]);
        //return of([]); // Return empty array for empty input
    }
      
  }*/
  
    selectTransaction(transaction: any) {
      this.selectedTransaction = transaction;
      
    } 
     editTransaction(transaction: Transaction) {
      this.selectedTransaction = transaction;
      if(this.selectedTransaction.type=== 'sortie'){
        this.router.navigate(['/vente-form/'+ transaction.id]);
      }else if(this.selectedTransaction.type=== 'entree'){
        this.router.navigate(['/entree-depot/'+ transaction.id]);
      } else if(this.selectedTransaction.type=== 'retour'){
        this.router.navigate(['/retour-depot/'+ transaction.id]);
      }
      
    }

    deleteTransaction(id: number | undefined){
      if(confirm("Etes vous sûr de vouloir supprimer ? ")){
        this.transactionService
        .deleteTransaction(id)
        .subscribe(() =>  this.loadDataSource());
      }
     
    }
}
