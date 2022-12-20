import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ENVIRONMENT, Environment} from '../../tokens';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor(
        @Inject(ENVIRONMENT) private _environment: Environment
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = request.url;
        if (!url.startsWith('/assets')) {
            if (!/^(http|https):/i.test(request.url)) {
                url = this._environment.endpointUrl + request.url;
            }
        }
        return next.handle(request.clone( {url}));
    }

}
