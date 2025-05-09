import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PosteFormComponent } from './poste-form/poste-form.component';
import { PosteListeComponent } from './poste-liste/poste-liste.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListeComponent } from './transaction-liste/transaction-liste.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    {path: "poste-form", component: PosteFormComponent, canActivate: [AuthGuard]},
    {path: "poste-form/:id", component: PosteFormComponent, canActivate: [AuthGuard]},
    {path: "poste-list", component: PosteListeComponent, canActivate: [AuthGuard]},
    {path: "produit-form", component: ProduitFormComponent, canActivate: [AuthGuard]},
    {path: "produit-form/:id", component: ProduitFormComponent, canActivate: [AuthGuard]},
    {path: "produit-list", component: ProduitListeComponent, canActivate: [AuthGuard]},
    {path: "transaction-form", component: TransactionFormComponent, canActivate: [AuthGuard]},
    {path: "transaction-form/:id", component: TransactionFormComponent, canActivate: [AuthGuard]},
    {path: "transaction-list", component: TransactionListeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
   
    
  ];
