import { Injectable } from '@angular/core';
import { GenericConstants } from '../models/generics';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL: string = GenericConstants.BACKEND_HOST_URL;
    
       httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Origin': '*'
          
        })
      };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:8080/depotHopital/api/login', { username, password })
      .pipe(tap(res => {
        localStorage.setItem('token', res.token);
      }));
  }
  
}
