import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Profile } from './profile.dto';

const PROFILE = gql`
	query{
		getThisAccount {
			id
			name
			avatar_url
			describe
			email
			phone
			birthmonth
			birthyear
			role
			setting {
				anonymous
				birthmonth_privacy
				birthyear_privacy
				email_privacy
				phone_privacy
			}
			status
			created_at
			updated_at
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProfileHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
	}

	fetchProfile() {
		return this.apollo.use('accountManagementService').query<any>({
			query: PROFILE,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): Profile => new Profile(data.getThisAccount)
		));
	}
}
