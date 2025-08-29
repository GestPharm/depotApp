import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { TokenStorageService } from "../services/token-storage.service";
import { GenericConstants } from "../models/generics";

// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = GenericConstants.BACKEND_HOST_URL;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, {
      username,
      password
    });
  }

  registrer(user: User){
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

    // auth.service.ts
  logout(): void {
    this.tokenStorage.signOut(); // or sessionStorage

  }

  storeToken(token: string) {
    this.tokenStorage.saveToken(token);
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
    return this.http.put(`${this.baseUrl}/api/users/${userId}/change-password`, payload);
  }
}
