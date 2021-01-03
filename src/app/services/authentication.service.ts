import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  register(email: string, password: string) {
    return this.http.post<any>(`${environment.todoApiUrl}/users`, { email, password }, { withCredentials: true });
  }

  login(email: string, password: string) {
    return this.http.post<AuthenticationResponse>(`${environment.todoApiUrl}/users/refresh-token`, { email, password }, { withCredentials: true })
      .pipe(map(response => {
        response.user.jwtToken = response.jwtToken;
        this.userSubject.next(response.user);
        this.startRefreshTokenTimer();
        return response;
      }));
  }

  logout() {
    this.http.delete<any>(`${environment.todoApiUrl}/users/refresh-token`, { withCredentials: true }).subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  refreshToken() {
    return this.http.get<AuthenticationResponse>(`${environment.todoApiUrl}/users/access-token`, { withCredentials: true })
      .pipe(map((response) => {
        response.user.jwtToken = response.jwtToken;
        this.userSubject.next(response.user);
        this.startRefreshTokenTimer();
        return response;
      }));
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

interface AuthenticationResponse {
  user: User
  jwtToken: string
}
