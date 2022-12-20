import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad,
  Route, Router, RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService, TokenManager} from "../serivices";

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _tokenManager: TokenManager,
    private _router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.#authenticate(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const path = this._router.getCurrentNavigation()?.extractedUrl.toString();
    return this.#authenticate(path);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.#authenticate(state.url);
  }

  #authenticate(redirectUrl?: string) {
    if (this._tokenManager.isLogged) {
      if (this._tokenManager.isExpired()) {
        this._authService.logout()
        return of(false)
      }
      return of(true);
    }
    this._authService.logout(redirectUrl);
    return of(false);
  }
}
