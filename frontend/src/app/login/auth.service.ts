import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { TokenStorageService } from "../services/token-storage.service";

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/depotHopital/api';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

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
    this.tokenStorage.signOut(); // or sessionStorage
    
  }

  storeToken(token: string) {
    this
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  getUser(): User {
    return this.tokenStorage.getUser();
  }

 

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    const payload = {
      currentPassword,
      newPassword
    };
    return this.http.put(`${this.baseUrl}/users/${userId}/change-password`, payload);
  }
}
