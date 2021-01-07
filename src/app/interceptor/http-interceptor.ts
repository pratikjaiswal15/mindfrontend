import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token')
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        return next.handle(request).pipe(catchError(err => {
            
            switch (err.status) {
                case 401: {
                    this.authenticationService.logout()
                    break;
                }
                case 403: {
                    this.authenticationService.logout()
                    break;
                }
                default:
                    const error = err.error.message || err.statusText;
                    alert(error)
                    return throwError(error);

            }

            const error = err.error.message || err.statusText;
            alert(error)
            return throwError(error);


        }))
    }
}