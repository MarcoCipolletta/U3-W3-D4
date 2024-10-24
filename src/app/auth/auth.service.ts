import { iResponseData } from './../interfaces/i-response-data';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iUser } from '../interfaces/i-user';
import { ILogin } from '../interfaces/i-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  jwtHelper: JwtHelperService = new JwtHelperService(); //Per leggere i Jwt

  authSubject$ = new BehaviorSubject<iResponseData | null>(null);

  alertOpen$ = new Subject<boolean>();

  isLoggedIn: boolean = false;

  user$ = this.authSubject$
    .asObservable() //contiene dati sull'utente se è loggato
    .pipe(
      tap((accessData) => (this.isLoggedIn = !!accessData)),
      map((accessData) => accessData?.user)
    );

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  register(newUser: Partial<iUser>) {
    return this.http.post<iResponseData>(this.registerUrl, newUser);
  }
  login(dataLogin: ILogin) {
    return this.http.post<iResponseData>(this.loginUrl, dataLogin).pipe(
      tap((authData) => {
        console.log(authData);

        this.authSubject$.next(authData);

        localStorage.setItem('loginData', JSON.stringify(authData));

        const expData = this.jwtHelper.getTokenExpirationDate(
          authData.accessToken
        ); //recupero la data di scadenza del token

        if (expData) {
          this.autoLogout(expData);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('loginData');
    this.authSubject$.next(null);
    this.router.navigate(['/auth/login']);
  }

  autoLogout(expData: Date) {
    const expMs = expData.getTime() - new Date().getTime();

    //se nel backend c'è il refresh del token posso creare una variabile che contiene il setTimeout in modo da poter usare clearTimeout ad ogni refresh del token

    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  restoreUser() {
    const savedUser = localStorage.getItem('loginData');

    if (!savedUser) return;
    const loginResponse: iResponseData = JSON.parse(savedUser);

    if (this.jwtHelper.isTokenExpired(loginResponse.accessToken)) {
      //controllo se l'utente che è salvato nel localStorage ha il token scaduto

      localStorage.removeItem('loginData');
      return;
    }
    this.authSubject$.next(loginResponse);
  }
}
