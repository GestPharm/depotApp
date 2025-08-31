import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { GenericConstants } from '../models/generics';
import { StatPoste } from '../statistiques/stat-poste.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


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

    getTransaction(id: string): Observable<Transaction> {
      return this.http.get<Transaction>(`${this.baseURL}/api/transactions/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    getAllTransaction(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(`${this.baseURL}/api/transactions`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

     getDernieresVentes(): Observable<Transaction[]> {
          return this.http.get<Transaction[]>(`${this.baseURL}/api/transactions/dernieres_ventes`, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );

     }



    createTransaction(transaction: Transaction): Observable<Transaction> {

      return this.http.post<Transaction>(`${this.baseURL}/api/transactions/`, JSON.stringify(transaction), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    updateTransaction(id: number|undefined, transaction: Transaction): Observable<Transaction> {

      return this.http.put<Transaction>(`${this.baseURL}/api/transactions/${id}`, transaction, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    /** DELETE: delete the hero from the server */
  deleteTransaction(id: number | undefined): Observable<unknown> {
    const url = `${this.baseURL}/api/transactions/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  rechercherTransaction(dci: string | null, nomPoste: string| null): Observable<Transaction[]> {

    let params= new HttpParams();
    if(dci){
      params= params.set('dci', dci);
    }
    if(nomPoste){
      params= params.set('nomPoste', nomPoste);
    }
    const options = params.keys().length > 0 ?
     { params: params } : {};
    return this.http.get<Transaction[]>(`${this.baseURL}/api/transactions/rechercher`, options)
    .pipe(
      catchError(this.handleError)
    );
  }


  getStatByPoste(idPoste: number): Observable<StatPoste> {



    return this.http.get<StatPoste>(`${this.baseURL}/api/transactions/stat_by_poste/${idPoste}`)
    .pipe(
      catchError(this.handleError)
    );
  }




  getVentesDuMois(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/api/transactions/ventes-du-mois`);
  }

  getTransactionStats(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/transactions/stats`);
  }

  getVentesParMois(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/transactions/ventes-par-mois`);
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

