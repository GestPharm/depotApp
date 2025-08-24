import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router'



import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste.model';
import { ListIem } from '../models/generics';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPills, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-poste-form',
  imports: [FormsModule, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './poste-form.component.html',
  styleUrl: './poste-form.component.css'
})
export class PosteFormComponent implements OnInit {

  poste : Poste = new Poste({});
  id: string | null=null;
  title = '';

    faPills = faPills;
    faSave = faSave;
    faArrowLeft = faArrowLeft;
  

  fonctions: ListIem[] = [
    {value: 'poste' ,  viewValue: 'Poste'},
    {value: 'maitre', viewValue: 'Maitre'},
    {value: 'apprenti', viewValue: 'Apprenti'},
  ];

  constructor(public posteService: PosteService, private route: ActivatedRoute,
    private location: Location, private router: Router){

      const param = this.route.snapshot.paramMap.get('id');
      if(param !== undefined && param!= null){
        this.id = String(this.route.snapshot.paramMap.get('id'));
      }
     
    this.poste  = new Poste({});
  }

  

  ngOnInit() {
    if(this.isCreation()){
      this.title = "Création d'un poste";
    }else if(this.id != null){
      this.title = "Modification d'un poste";
      this.posteService.getPoste(this.id).subscribe( value =>{
        this.poste = new Poste(value);
      });
    }
  }

  public isCreation(): boolean{
    return this.id === undefined || this.id === null || this.id == '';
  }

  

  goToList(){
    this.router.navigate(['/poste-list']);
  }

  public update(){
    this.posteService
      .updatePoste(this.poste.id, this.poste)
      .subscribe(poste => this.goToList());
  }

  public save(){
    this.posteService
      .createPoste(this.poste)
      .subscribe(poste => this.goToList());
  }
}
