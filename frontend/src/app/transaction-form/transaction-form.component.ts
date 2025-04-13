import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router'



import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { ListIem } from '../models/generics';
import { CommonModule, Location } from '@angular/common';
import { AddProduitModalComponent } from './add-produit-modal/add-produit-modal.component';
import { LigneProduit } from '../models/ligneProduit.model';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Poste } from '../models/poste.model';
import { Observable, of } from 'rxjs';
import { PosteService } from '../services/poste.service';



@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule, CommonModule, RouterLink, NgxPaginationModule, FontAwesomeModule, MatDatepickerModule, MatAutocompleteModule],
  templateUrl: './transaction-form.component.html',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  transaction : Transaction = new Transaction({});
  id: string | null=null;
  title = '';
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
  

  isModalVisible = false;

  listePoste: Poste[] = [];

  searchText: string = ''; // The value bound to the input field using ngModel
  filteredOptions: Observable<Poste[]> = of([]); // Observable for the autocomplete options
  

  
  

  typeTransactions: ListIem[] = [
    {value: 'entree' ,  viewValue: 'Entrée'},
    {value: 'sortie', viewValue: 'Sortie'},
    {value: 'retour', viewValue: 'Retour'},
  ];

  constructor(public transactionService: TransactionService, private route: ActivatedRoute,
    private location: Location, private router: Router, public dialog: MatDialog, private posteService: PosteService, private cdr: ChangeDetectorRef){

      const param = this.route.snapshot.paramMap.get('id');
      if(param !== undefined && param!= null){
        this.id = String(this.route.snapshot.paramMap.get('id'));
      }
     
    this.transaction  = new Transaction({});
  }

  

  ngOnInit() {

    this.loadPostes();
    if(this.isCreation()){
      this.title = "Création d'une transaction";
    }else if(this.id != null){
      this.title = "Modification d'une transaction";
      this.transactionService.getTransaction(this.id).subscribe( value =>{
        this.transaction = new Transaction(value);
        if(this.transaction.poste){
            this.onSearchChange(this.transaction.poste);
        }
        this.cdr.detectChanges();

      });
    }

    
  }

  openDialog(selectedProduit: LigneProduit | undefined): void {

      const dialogRef = this.dialog.open(AddProduitModalComponent, {
        width: '400px',
        data: {selectedProduit: selectedProduit, listeProduit: this.transaction.ligneProduits}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.length > 0){
          this.transaction.ligneProduits = result;
          this.calculateTotalCost();
          // Forcez la détection de changement
          this.cdr.detectChanges();
          
        }
        
        
      });
    
    
  }

  public isCreation(): boolean{
    return this.id === undefined || this.id === null || this.id == '';
  }

  calculateTotalCost(){
    if(this.transaction.ligneProduits && this.transaction.ligneProduits.length > 0){
      this.transaction.prixTotal = this.transaction.ligneProduits.map(elt => elt.prixTotal).reduce((sum, p)=> (sum && p )?sum +p:0);
    }
  }
  

  goToList(){
    this.router.navigate(['/transaction-list']);
  }

  public update(){
    this.transactionService
      .updateTransaction(this.transaction.id, this.transaction)
      .subscribe(transaction => this.goToList());
  }

  public save(){
    this.transactionService
      .createTransaction(this.transaction)
      .subscribe(transaction => this.goToList());
  }

  loadPostes(): void {
      this.posteService.getAllPoste().subscribe(
        (postes: Poste[]) => {
          this.listePoste = postes; // Stockez la liste complète
          this.filtrerPostes(); // Appliquez le filtre initial
        },
        (error) => {
          console.error('Erreur lors du chargement des postes', error);
        }
      );
    }
  
    filtrerPostes(): void {
      if (this.searchText) {
        // Filtrez les postes dont la DCI correspond à la requête
        const val = this.listePoste.filter(poste =>
          poste?.nom?.toLowerCase().includes(this.searchText.toLowerCase())
        );
  
        this.filteredOptions= of(val)
      } else {
        // Si la requête est vide, affichez tous les postes
        this.filteredOptions = of([]);
      }
    }
  
    onSearchChange(query: string | Poste): void {
      // Si searchText est un objet Poste, extrayez la propriété 'nom'
      

      if(typeof query === 'string'){
        this.searchText = query;
      }else{
          this.searchText=query?.nom ? query.nom : '';
      }
    
      this.filtrerPostes(); // Appliquez le filtre
    }
  
  
    onSelectPoste($event: Poste){
      if($event){
        this.transaction.poste=new Poste($event);
  
      }
      
    }
  
    displayPoste(option: string | Poste) {
      if(typeof option === 'string'){
        return toTitleCase(option);
      }else{
          return option?.nom ? option.nom : '';
      }
     
    }

    showListProduit(){
      return this.transaction.ligneProduits && this.transaction.ligneProduits.length > 0;
    }

 

}

function toTitleCase(str: string) {
  return str.toLowerCase().split(' ').map((word: any) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

