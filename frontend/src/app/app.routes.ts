import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PosteFormComponent } from './poste-form/poste-form.component';
import { PosteListeComponent } from './poste-liste/poste-liste.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { TransactionListeComponent } from './transaction-liste/transaction-liste.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { VenteComponent } from './transaction-form/vente/vente.component';
import { EntreeDepotComponent } from './transaction-form/entree-depot/entree-depot.component';
import { RetourDepotComponent } from './transaction-form/retour-depot/retour-depot.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { RegisterComponent } from './resgister/register.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    {path: "poste-form", component: PosteFormComponent, canActivate: [AuthGuard]},
    {path: "poste-form/:id", component: PosteFormComponent, canActivate: [AuthGuard]},
    {path: "poste-list", component: PosteListeComponent, canActivate: [AuthGuard]},
    {path: "produit-form", component: ProduitFormComponent, canActivate: [AuthGuard]},
    {path: "produit-form/:id", component: ProduitFormComponent, canActivate: [AuthGuard]},
    {path: "produit-list", component: ProduitListeComponent, canActivate: [AuthGuard]},
    {path: "vente-form", component: VenteComponent, canActivate: [AuthGuard]},
    {path: "vente-form/:id", component: VenteComponent, canActivate: [AuthGuard]},
    {path: "entree-depot", component: EntreeDepotComponent, canActivate: [AuthGuard]},
    {path: "entree-depot/:id", component: EntreeDepotComponent, canActivate: [AuthGuard]},
    {path: "retour-depot", component: RetourDepotComponent, canActivate: [AuthGuard]},
    {path: "retour-depot/:id", component: RetourDepotComponent, canActivate: [AuthGuard]},
    {path: "transaction-list", component: TransactionListeComponent, canActivate: [AuthGuard]},
    {path: "stat-poste", component: StatistiquesComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
    
  ];
