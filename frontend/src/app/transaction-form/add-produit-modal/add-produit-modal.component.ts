import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { LigneProduit } from '../../models/ligneProduit.model';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Poste } from '../../models/poste.model';







@Component({
  selector: 'app-add-produit-modal',
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatIconModule, FontAwesomeModule],
  templateUrl: './add-produit-modal.component.html',
  styleUrl: './add-produit-modal.component.scss'
})
export class AddProduitModalComponent implements OnInit{
title: any;
ligneProduit: LigneProduit = new LigneProduit({});
listLigneProduit: LigneProduit[] = [];
listeProduit: Produit[] = [];
isCreation = true;

searchText: string = ''; // The value bound to the input field using ngModel
filteredOptions: Observable<Produit[]> = of([]); // Observable for the autocomplete options

faClose= faClose;


save() {
  if(this.ligneProduit && this.ligneProduit.produit?.prix && this.ligneProduit.quantite){
    this.ligneProduit.prixTotal=this.ligneProduit.produit?.prix * this.ligneProduit.quantite;
  }else{
    this.ligneProduit.prixTotal=0;
  }
  if(this.isCreation){
    this.listLigneProduit.push(this.ligneProduit);
    this.dialogRef.close(this.listLigneProduit);
  }else {
    this.modifierLigneProduit(this.ligneProduit.id, this.ligneProduit);
    this.dialogRef.close(this.listLigneProduit);
  }
}

modifierLigneProduit(id: number | undefined, nouvellesDonnees: LigneProduit): void {
  // Trouver l'index de l'élément à modifier
  const index = this.listLigneProduit.findIndex(item => item.id === id);

  if (index !== -1) {
    // Mettre à jour l'élément
    this.listLigneProduit[index] = { ...this.listLigneProduit[index], ...nouvellesDonnees };
  } else {
    console.error('Élément non trouvé');
  }
}

  constructor(
    public dialogRef: MatDialogRef<AddProduitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private produitService: ProduitService,  private cdr: ChangeDetectorRef) {

      if(data && data.selectedProduit){
        this.ligneProduit = data.selectedProduit
        this.isCreation = false;
        
       
      }

      if(data && data.listeProduit){
        this.listLigneProduit = data.listeProduit;
        
      }
      
    }


  ngOnInit(): void {

    if(this.isCreation){
      this.title = "Ajout d'un produit";
    }else {
      this.title = "Modification d'un produit";
    }
  
      this.loadProduits();

     
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadProduits(): void {
    this.produitService.getAllProduit().subscribe(
      (produits: Produit[]) => {
        this.listeProduit = produits; // Store the full list of products
  
        // If editing, initialize the selected product
        if (this.ligneProduit?.produit) {
          
          this.onSelectProduit(this.ligneProduit?.produit);
          this.searchText = this.displayProduit(this.ligneProduit.produit);
        } 
        this.filteredOptions = of([]); // No product selected, clear the options
       
  
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  filtrerProduits(): void {
    if (this.searchText && this.searchText.trim().length > 0) {
      // Filter products whose DCI matches the search query
      const filtered = this.listeProduit.filter(produit =>
        produit?.dci?.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.filteredOptions = of(filtered);
    } else {
      // If the search query is empty, show no options
      this.filteredOptions = of([]);
    }
  }


  onSearchChange(query: string | Produit): void {
    if (typeof query === 'string') {
      this.searchText = query;
      
    } else {
      this.searchText = query?.dci ? query.dci : '';
      
    }
    this.filtrerProduits(); // Filter products based on the search text
 }

  onSelectProduit($event: Produit){
    if($event){
      this.ligneProduit.produit=new Produit($event);
      this.searchText = this.displayProduit($event);

    }
    
  }

  

  // Display function for the autocomplete
  displayProduit(option: string | Produit): string {
    if (typeof option === 'string') {
      return toTitleCase(option);
    } else {
      return `${toTitleCase(option?.dci)} ${toTitleCase(option?.dosage)}`;
    }
  }



  delete(){
    const index = this.listLigneProduit.findIndex(item => item.id === this.ligneProduit.id);

    if (index !== -1) {
      // Mettre à jour l'élément
      this.listLigneProduit.splice(index);
      this.dialogRef.close(this.listLigneProduit);
    } else {
      console.error('Élément non trouvé');
    }
  
  }

}


function toTitleCase(str: string | undefined) {
  if (!str) return ''; // Hand
  return str.toLowerCase().split(' ').map((word: any) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

