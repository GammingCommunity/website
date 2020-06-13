import { Injectable, ViewContainerRef, ViewRef, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, finalize, switchMap } from 'rxjs/operators';
import { ServiceUrls } from 'src/environments/environment';
import { LoaderService } from 'src/app/common/dialogs/loader/loader.service';
import { LocalLoader } from 'src/app/common/dialogs/loader/loader.dto';
import { ClientCommonService } from '../../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class SearchRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

}
