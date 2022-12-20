import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FULL_RESPONSE} from "../teardown/http-context";

@Injectable()
export class SetupInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                map((response) => {
                    const fullResponse = request.context.get(FULL_RESPONSE)
                    const applicationUrlUsed = !/^(http|https):/i.test(request.url);
                    if (response instanceof HttpResponse && applicationUrlUsed && !fullResponse) {
                        return response.clone({body: response.body.data});
                    }
                    return response;
                })
            );
    }


}
