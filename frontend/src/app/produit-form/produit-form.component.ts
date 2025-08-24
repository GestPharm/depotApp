import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router'



import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';
import { ListIem } from '../models/generics';
import { CommonModule, Location } from '@angular/common';
import { faArrowLeft, faPills, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-produit-form',
  imports: [FormsModule, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './produit-form.component.html',
  styleUrl: './produit-form.component.css'
})
export class ProduitFormComponent implements OnInit {

  produit : Produit = new Produit({});
  id: string | null=null;
  title = '';

  faPills = faPills;
  faSave = faSave;
  faArrowLeft = faArrowLeft;
  

  fonctions: ListIem[] = [
    {value: 'produit' ,  viewValue: 'Produit'},
    {value: 'maitre', viewValue: 'Maitre'},
    {value: 'apprenti', viewValue: 'Apprenti'},
  ];

  constructor(public produitService: ProduitService, private route: ActivatedRoute,
    private location: Location, private router: Router){

      const param = this.route.snapshot.paramMap.get('id');
      if(param !== undefined && param!= null){
        this.id = String(this.route.snapshot.paramMap.get('id'));
      }
     
    this.produit  = new Produit({});
  }

  

  ngOnInit() {
    if(this.isCreation()){
      this.title = "Création d'un produit";
    }else if(this.id != null){
      this.title = "Modification d'un produit";
      this.produitService.getProduit(this.id).subscribe( value =>{
        this.produit = new Produit(value);
      });
    }
  }

  public isCreation(): boolean{
    return this.id === undefined || this.id === null || this.id == '';
  }

  

  goToList(){
    this.router.navigate(['/produit-list']);
  }

  public update(){
    this.produitService
      .updateProduit(this.produit.id, this.produit)
      .subscribe(produit => this.goToList());
  }

  public save(){
    this.produitService
      .createProduit(this.produit)
      .subscribe(produit => this.goToList());
  }
}
