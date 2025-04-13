import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Produit } from '../models/produit.model';
import { GenericConstants } from '../models/generics';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

 
  baseURL: string = GenericConstants.BACKEND_HOST_URL;
  
     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': '*'
        
      })
    };
  
    constructor(private http: HttpClient) {}
    
    getProduit(id: string): Observable<Produit> {
      return this.http.get<Produit>(`${this.baseURL}/api/produits/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    getAllProduit(): Observable<Produit[]> {
      return this.http.get<Produit[]>(`${this.baseURL}/api/produits`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

   
  
    createProduit(produit: Produit): Observable<Produit> {
    
      return this.http.post<Produit>(`${this.baseURL}/api/produits/`, JSON.stringify(produit), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    updateProduit(id: number|undefined, produit: Produit): Observable<Produit> {
    
      return this.http.put<Produit>(`${this.baseURL}/api/produits/${id}`, produit, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    /** DELETE: delete the hero from the server */
  deleteProduit(id: number | undefined): Observable<unknown> {
    const url = `${this.baseURL}/api/produits/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
}

