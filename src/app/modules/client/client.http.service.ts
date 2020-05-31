import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { MyProfile } from "./client.dto";
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientCommonService } from './client.common-service';

const MY_PROFILE = gql`
  query {getThisAccount{ id, name, avatar_url }}
`;

@Injectable({
	providedIn: "root"
})
export class ClientHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchProfile() {
		return this.apollo.use('accountManagementService').query<any>({
			query: MY_PROFILE,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): MyProfile => new MyProfile(data.getThisAccount)
		));
	}
}
