import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router'



import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { ListIem } from '../../models/generics';
import { CommonModule, Location } from '@angular/common';
import { AddProduitModalComponent } from '../add-produit-modal/add-produit-modal.component';
import { LigneProduit } from '../../models/ligneProduit.model';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { faArrowLeft, faBoxOpen, faEye, faPen, faPills, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Poste } from '../../models/poste.model';
import { Observable, of } from 'rxjs';
import { PosteService } from '../../services/poste.service';
import { ValidationMsgComponent } from "../../validation-msg/validation-msg.component";
import { ValidationFields } from '../../models/validationFields';


@Component({
  selector: 'app-entree-depot',
  imports: [FormsModule, CommonModule, RouterLink, NgxPaginationModule, FontAwesomeModule, MatDatepickerModule, MatAutocompleteModule, ValidationMsgComponent],
  templateUrl: './entree-depot.component.html',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './entree-depot.component.scss'
})
export class EntreeDepotComponent {

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

        faBoxOpen = faBoxOpen;
        faSave = faSave;
        faPlus = faPlus;
        faPills = faPills;
        faArrowLeft = faArrowLeft;
  

  isModalVisible = false;

  
  searchText: string = ''; // The value bound to the input field using ngModel
  filteredOptions: Observable<Poste[]> = of([]); // Observable for the autocomplete options
  

  
  

  
  formValidation: ValidationFields|null = null;

  constructor(public transactionService: TransactionService, private route: ActivatedRoute,
    private location: Location, private router: Router, public dialog: MatDialog, private posteService: PosteService, private cdr: ChangeDetectorRef){

      const param = this.route.snapshot.paramMap.get('id');
      if(param !== undefined && param!= null){
        this.id = String(this.route.snapshot.paramMap.get('id'));
      }
     
    this.transaction  = new Transaction({});
  }

  

  ngOnInit() {

    
    if(this.isCreation()){
      this.title = "Création d'une entrée";
    }else if(this.id != null){
      this.title = "Modification d'une entrée";
      this.transactionService.getTransaction(this.id).subscribe( value =>{
        this.transaction = new Transaction(value);
        
        this.validate();
        this.cdr.detectChanges();

      });
    }
    this.transaction.type = 'entree';

    
  }

  openDialog(selectedProduit: LigneProduit | undefined): void {

      const dialogRef = this.dialog.open(AddProduitModalComponent, {
        width: '400px',
        data: {selectedProduit: selectedProduit, listeProduit: this.transaction.ligneProduits}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result && result.length > 0){
          this.transaction.ligneProduits = result;
          this.validate();
          // Forcez la détection de changement
          this.cdr.detectChanges();
          
        }
        
        
      });
    
    
  }

  public isCreation(): boolean{
    return this.id === undefined || this.id === null || this.id == '';
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

 
  
  
    
  
  
   
    showListProduit(){
      return this.transaction.ligneProduits && this.transaction.ligneProduits.length > 0;
    }

    validate(){
      let errors: string[] = [];
      let warnings: string[] = [];
      if(this.transaction && this.transaction.ligneProduits){
        for (var lp of this.transaction.ligneProduits) {
          if( this.transaction.type == "sortie" && Number(lp?.quantite) > Number(lp.produit?.quantite) ){
            errors.push("La quantité restante est insuffisante");
          }
        }
      }

      if(errors.length > 0 || warnings.length > 0){
        this.formValidation = new ValidationFields({errors: errors, warnings: warnings});
      }else {
        this.formValidation =  null;
      }
    }

 

}

function toTitleCase(str: string) {
  return str.toLowerCase().split(' ').map((word: any) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

