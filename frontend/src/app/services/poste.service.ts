import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Poste } from '../models/poste.model';
import { GenericConstants } from '../models/generics';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

 
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
    
    getPoste(id: string): Observable<Poste> {
      return this.http.get<Poste>(`${this.baseURL}/api/postes/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    getAllPoste(): Observable<Poste[]> {
      return this.http.get<Poste[]>(`${this.baseURL}/api/postes`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

   
  
    createPoste(poste: Poste): Observable<Poste> {
    
      return this.http.post<Poste>(`${this.baseURL}/api/postes/`, JSON.stringify(poste), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    updatePoste(id: number|undefined, poste: Poste): Observable<Poste> {
    
      return this.http.put<Poste>(`${this.baseURL}/api/postes/${id}`, poste, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
  
    /** DELETE: delete the hero from the server */
  deletePoste(id: number | undefined): Observable<unknown> {
    const url = `${this.baseURL}/api/postes/${id}`; // DELETE api/heroes/42
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

