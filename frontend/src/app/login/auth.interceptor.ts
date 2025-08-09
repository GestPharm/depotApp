import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenStorageService);
  const router = inject(Router);
  const token = tokenService.getToken();

  // ✅ Skip token for auth-related or public endpoints
  const isPublic = req.url.includes('/login') || req.url.includes('/register') || req.url.includes('/public');

  if (token && !isPublic) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(
      catchError((error) => {
        if (error.status === 403) {
          // Handle 403 Forbidden (token might be expired or invalid)
          localStorage.removeItem('token'); // Clear invalid token
          router.navigate(['/login']); // Redirect to login
        }
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        // Handle 403 Forbidden for public routes (unlikely but possible)
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};