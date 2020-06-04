import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize, retry } from 'rxjs/operators';
import { AlertService } from '../common/dialogs/alert/alert.service';
import { DebugConfigs, environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private alretService: AlertService) { }

	protected alertError(message: string, callback: () => Observable<HttpEvent<any>>) {
		if (DebugConfigs.isAlert) {
			this.alretService.show(message, 'Retry', () => {
				callback().subscribe(() => {
					this.alertError(message, callback);
				});
			});
		}
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse && event.body.hasOwnProperty('errors')) {
						const errors = event.body.errors;
						let messages = '';

						errors.forEach(error => {
							messages += error.message + '\n';
						});
						this.alertError(messages, () => next.handle(req));
					}
				},
				error => {
					// console.log(error, () => next.handle(req));
					if (error.hasOwnProperty('message')) {
						this.alertError(error.message, () => next.handle(req));
					} else {
						this.alertError(error.toString(), () => next.handle(req));
					}
				}
			),
			retry(environment.requestRetryTime)
		);
	}
}