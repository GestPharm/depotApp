import { Component, OnInit } from '@angular/core';
import { Poste } from '../models/poste.model';
import { Observable, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { PosteService } from '../services/poste.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { StatPoste } from './stat-poste.model';
import { GenericConstants, TransactionType } from '../models/generics';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommandCounterComponent } from '../command-counter/command-counter.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-statistiques',
  imports: [FormsModule, CommonModule, MatAutocompleteModule, RouterLink, FontAwesomeModule, CommandCounterComponent],
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.scss'
})
export class StatistiquesComponent implements OnInit {


  
  title = '';

  listePoste: Poste[] = [];
  selectedPoste: Poste | null;
  
    searchText: string = ''; // The value bound to the input field using ngModel
    filteredOptions: Observable<Poste[]> = of([]); // Observable for the autocomplete options

    statPoste: StatPoste = new StatPoste({nbTotalCommandes:0, depenseTotale:0, budgetTotal:0});

     
    faEye= faEye;
    baseURL: string = GenericConstants.BACKEND_HOST_URL;

    

    constructor(public transactionService: TransactionService,  private posteService: PosteService, private http: HttpClient){
      this.selectedPoste=null;
       
    }
  
    
  
    ngOnInit() {
  
      this.loadPostes();
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
          if (!this.searchText || this.searchText.length < 2) {
            this.filteredOptions = of([]);
          }
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
            this.selectedPoste=new Poste($event);

            if(this.selectedPoste && this.selectedPoste.id){
                this.transactionService.getStatByPoste(this.selectedPoste.id).subscribe(
                  obj => {
                    this.statPoste = new StatPoste(obj);
                  }
                );
            }
      
          }
          
        }
      
        displayPoste(option: string | Poste) {
          if(typeof option === 'string'){
            return toTitleCase(option);
          }else{
              return option?.nom ? option.nom : '';
          }
         
        }


        downloadPdf() {
          if(this.selectedPoste && this.selectedPoste.id){
             this.http.get(`${this.baseURL}/api/pdf/stat_by_poste_pdf/${this.selectedPoste.id}`, { responseType: 'blob' })
                .subscribe((res: Blob) => {
                  const blob = new Blob([res], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'dernieres_commandes.pdf';
                  a.click();
                  window.URL.revokeObjectURL(url);
                });
              }
        }



          getTransactionTypeLabel(arg0: string|undefined) {
            return arg0 ? TransactionType[arg0 as keyof typeof TransactionType] : '';
          }
          
  

}

function toTitleCase(str: string) {
  return str.toLowerCase().split(' ').map((word: any) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
