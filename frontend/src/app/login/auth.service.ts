import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/depotHopital/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      username,
      password
    });
  }

  registrer(user: User){
    return this.http.post(`${this.baseUrl}/register`, user);
  }

    // auth.service.ts
  logout(): void {
    localStorage.removeItem('token'); // or sessionStorage
    
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
