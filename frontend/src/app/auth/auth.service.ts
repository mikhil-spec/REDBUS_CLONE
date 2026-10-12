import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { url, googleClientId } from '../config';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  role?: string;
  notificationPreferences?: any;
  themePreference?: 'light' | 'dark';
}

interface AuthResponse {
  success: boolean;
  message: string;
  isNewAccount?: boolean;
  token: string;
  data: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'redbus_auth_token';
  // Set when the server rejects the stored session. Cleared by the next sign-in.
  sessionExpired = false;
  private readonly userKey = 'Loggedinuser';
  private userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());
  readonly user$: Observable<AuthUser | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem(this.tokenKey) || localStorage.getItem('userToken');
  }

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.token && !!this.currentUser;
  }

  googleLogin(credential: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${url}/api/auth/google`, { credential });
  }

  expireSession(): void {
    this.logout();
    this.sessionExpired = true;
  }

  completeLogin(response: AuthResponse): void {
    this.sessionExpired = false;
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('userToken', response.token);
    sessionStorage.setItem(this.userKey, JSON.stringify(response.data));
    this.userSubject.next(response.data);
  }

  // Replace the stored user record (used after profile edits) without touching the token.
  setCurrentUser(user: AuthUser): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    sessionStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  getGoogleClientId(): string {
    return googleClientId;
  }

  private readUser(): AuthUser | null {
    try {
      const raw = sessionStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
