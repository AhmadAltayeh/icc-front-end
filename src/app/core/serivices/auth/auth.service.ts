import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthModel} from '../../models';
import {TokenManager} from './token-manager';
import {Injectable, Optional} from "@angular/core";

@Injectable({providedIn: 'root'})

export abstract class AuthService {

  protected constructor(
    @Optional() protected _httpClient: HttpClient,
    @Optional() protected _tokenManager: TokenManager,
    @Optional() protected _router: Router
  ) {
  }

  protected _state = new BehaviorSubject(this.authenticated);

  get authenticated() {
    return this._tokenManager.isLogged && !this._tokenManager.isExpired();
  }

  get authenticated$() {
    return this._state.asObservable();
  }

  forgotPassword(email: string): Observable<any> {
    return this._httpClient
      .post(`forgetPassword?email=${email}`, {});
  }

  login(credentials: AuthModel.Login): Observable<any> {
    return this._httpClient
      .post<AuthModel.ILoginResponse>('user/auth/login', credentials)
      .pipe(
        tap((response) => {
          console.log(response)
          this._tokenManager.setTokens(response.token.split(' ')[1]);
          this._state.next(this.authenticated);
          return of(response);
        }));
  }

  refresh(): void {
    this._state.next(this.authenticated);
  }

  logout(redirectUrl = this._router.url): Observable<any> {
    const token = `Bearer ${this._tokenManager.accessToken}`;
    this._tokenManager.deleteTokens();
    this._state.next(this.authenticated);
    this._router.navigate(['auth/login'])
    return this._httpClient.post('user/auth/logout', {
      token: token
    });
  }

}
