import { Component, OnInit } from '@angular/core';
import { Poste } from '../models/poste.model';
import { PosteService } from '../services/poste.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';
import { LabelTextComponent } from '../graphics/label-text/label-text.component';

@Component({
  selector: 'app-poste-list',
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterLink, LabelTextComponent],
  templateUrl: './poste-liste.component.html',
  styleUrl: './poste-liste.component.scss'
})
export class PosteListeComponent implements OnInit{

   postes: Poste[] = [];
    selectedPoste: any;
    filteredPostes: Observable<Poste[]> = of([]);
  searchTerm: string = '';

    faTrash= faTrash;
      faPen = faPen;
      faEye= faEye;

      
  
    constructor(private posteService: PosteService, private router: Router) { }
  
    ngOnInit() {
       this.loadDataSource ();

    }

    loadDataSource (){

      this.posteService.getAllPoste().subscribe(data => {
  
        this.postes = data;

       
      });
  
    }

    selectPoste(poste: any) {
      this.selectedPoste = poste;
      
    }


    
   
    deletePoste(id: number | undefined){
      if(confirm("Etes vous sûr de vouloir supprimer ? ")){
        this.posteService
        .deletePoste(id)
        .subscribe(() =>  this.loadDataSource());
      }
     
    }
}
