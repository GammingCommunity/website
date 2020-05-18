import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize } from 'rxjs/operators';
import { AlertService } from '../common/dialogs/alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private loaderService: LoaderService, private alretService: AlertService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loaderService.start();
		return next.handle(req).pipe(
			tap(
				// Succeeds when there is a response; ignore other events
				event => {
						// For graphql
						if (event instanceof HttpResponse && event.body.hasOwnProperty('errors')){
							const errors = event.body.errors;
							let messages = '';
							
							errors.forEach(error =>{
								messages += error.message + '\n';
							});
							this.alretService.show(messages);
						} else {
							// console.log('event:');
							// console.log(event);
						}
				},
				// Operation failed; error is an HttpErrorResponse
				error => {
					// console.log(error);
					if(error.hasOwnProperty('message')){
						this.alretService.show(error.message);
					} else {
						this.alretService.show(error.toString());
					}
				}
			),
			// Log when response observable either completes or errors
			finalize(() => {
				this.loaderService.end();
			})
		);
	}
}