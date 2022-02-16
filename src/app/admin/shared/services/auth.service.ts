import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthResponse, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    // @ts-ignore
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        // @ts-ignore
        tap(this.setToken),
        catchError(this.handleError.bind(this)
        ));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого e-mail нет');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный e-mail');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
    }
    return throwError(error);
  }

  private setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
