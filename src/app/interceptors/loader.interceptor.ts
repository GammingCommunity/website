import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(private loaderService: LoaderService) { }

	logHeader(req: HttpRequest<any>){
		if (!environment.production){
			console.log(req);///////////////////////////////////
		}
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		this.loaderService.start();
		this.logHeader(req);
		
		return next.handle(req).pipe(
			tap(
				// // Succeeds when there is a response; ignore other events
				// event => ok = event instanceof HttpResponse ? 'succeeded' : '',
				// // Operation failed; error is an HttpErrorResponse
				// error => ok = 'failed'
			),
			// Log when response observable either completes or errors
			finalize(() => {
				this.loaderService.end();
			})
		);
	}
}