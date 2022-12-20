import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Environment, ENVIRONMENT} from '../../tokens';
import {AuthService, TokenManager} from "../../serivices";
import {NzMessageService} from "ng-zorro-antd/message";
import {SNACKBAR_OPTIONS} from "./http-context";

@Injectable()
export class TeardownInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _tokenManager: TokenManager,
    @Inject(ENVIRONMENT) private _environment: Environment,
    private message: NzMessageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const snackbarOptions = request.context.get(SNACKBAR_OPTIONS)
    const showSnackbar = !!snackbarOptions && request.method !== 'GET';
    const headers = request.headers.set('Authorization', `Bearer ${this._tokenManager.accessToken}`);
    return next.handle(request.clone({headers}))
      .pipe(
        tap((response) => {
          if (response instanceof HttpResponse && showSnackbar) {
            const {message = null} = response.body;
            if (snackbarOptions?.successMessage || message) {
              this.message.success(snackbarOptions?.successMessage || message)
            }
          }
        }),
        catchError((event: HttpErrorResponse) => {
          if (event instanceof HttpErrorResponse) {
            switch (event.status) {
              case 403:
                this._authService.logout().subscribe();
                return throwError(() => event);
              case 500:
                this.message.warning('Internal server error. Please try again later.', {
                  nzDuration: 10000
                });
                break;
              case 404:
                if (event instanceof HttpErrorResponse && snackbarOptions) {
                  const message = snackbarOptions?.errorMessage ?? event.error?.message;
                  if (message) {
                    this.message.error(message || 'Unknown error', {
                      nzDuration: 10000
                    });
                  }
                }
                return throwError(() => event.error?.message);
                break;
              case 0:
                this.message.warning('Please check your internet then try again.', {
                  nzDuration: 10000
                });
                break;
              default:
                if (event instanceof HttpErrorResponse) {
                  const message = snackbarOptions?.errorMessage ?? event.error?.message;
                  this.message.error(message, {
                    nzDuration: 10000
                  });
                }
                return throwError(() => event.error?.message);
            }
          }
          return throwError(() => event);
        }),
      );
  }

}
