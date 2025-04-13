import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';
import { LabelTextComponent } from '../graphics/label-text/label-text.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-produit-list',
  imports: [CommonModule, RouterLink, FontAwesomeModule, FormsModule, LabelTextComponent, NgxPaginationModule],
  templateUrl: './produit-liste.component.html',
  styleUrl: './produit-liste.component.css'
})
export class ProduitListeComponent implements OnInit{

   produits: Produit[] = [];
    selectedProduit: any;
    filteredProduits: Observable<Produit[]> | undefined = of([]);
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

      
  
    constructor(private produitService: ProduitService, private router: Router) { }
  
    ngOnInit() {
       this.loadDataSource ();

    }

    loadDataSource (){

      this.produitService.getAllProduit().subscribe(data => {
  
        this.produits = data;

        this.filteredProduits = of([...this.produits]);
      });
  
    }

    filterProduits(): void {
      
      if (this.searchTerm ) {
        // Filtrez les postes dont la DCI correspond à la requête
        const val = this.produits.filter(poste =>
          poste?.dci?.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        if(val){
          this.filteredProduits= of(val);
        }
        
      } else {
        // Si la requête est vide, affichez tous les postes
        this.filteredProduits = of([...this.produits]);
      }
      
    }


  /*fetchProduits(query: string, ): Observable<Produit[]> {
   if(typeof query === 'string' && query && query.trim() !== ''){
        return this.produitService.rechercherProduit(null, query);
    }else  {
      return of([...this.produits]);
        //return of([]); // Return empty array for empty input
    }
      
  }*/
  
    selectProduit(produit: any) {
      this.selectedProduit = produit;
      
    } 
     editProduit(produit: any) {
      this.selectedProduit = produit;
      this.router.navigate(['/produit-form/'+ produit.id]);
    }

    deleteProduit(id: number | undefined){
      if(confirm("Etes vous sûr de vouloir supprimer ? ")){
        this.produitService
        .deleteProduit(id)
        .subscribe(() =>  this.loadDataSource());
      }
     
    }
}
