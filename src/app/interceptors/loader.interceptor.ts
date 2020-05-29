import { Injectable, ViewRef } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderOptions } from '../common/dialogs/loader/loader.dto';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(private loaderService: LoaderService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const loaderOptions = new LoaderOptions(req.body.variables);
		let loaderId;

		if (loaderOptions.isUseGlobalLoader) {
			loaderId = Symbol();
			this.loaderService.start(loaderId);
		}

		return next.handle(req).pipe(
			finalize(() => {
				if (loaderId) {
					this.loaderService.end(loaderId);
				}
			})
		);
	}
}