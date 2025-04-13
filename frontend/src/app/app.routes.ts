import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PosteFormComponent } from './poste-form/poste-form.component';
import { PosteListeComponent } from './poste-liste/poste-liste.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListeComponent } from './transaction-liste/transaction-liste.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
    {path: "home", component: HomeComponent},
    {path: "poste-form", component: PosteFormComponent},
    {path: "poste-form/:id", component: PosteFormComponent},
    {path: "poste-list", component: PosteListeComponent},
    {path: "produit-form", component: ProduitFormComponent},
    {path: "produit-form/:id", component: ProduitFormComponent},
    {path: "produit-list", component: ProduitListeComponent},
    {path: "transaction-form", component: TransactionFormComponent},
    {path: "transaction-form/:id", component: TransactionFormComponent},
    {path: "transaction-list", component: TransactionListeComponent},
    { path: 'login', component: LoginComponent },
   
    
  ];
