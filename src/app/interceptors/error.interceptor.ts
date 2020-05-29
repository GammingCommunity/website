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

	protected alertError(message: string) {
		if (DebugConfigs.isAlert) {
			this.alretService.show(message);
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
						this.alertError(messages);
					}
				},
				error => {
					// console.log(error);
					if (error.hasOwnProperty('message')) {
						this.alertError(error.message);
					} else {
						this.alertError(error.toString());
					}
				}
			),
			retry(environment.requestRetryTime)
		);
	}
}