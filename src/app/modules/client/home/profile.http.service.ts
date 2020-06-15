import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientCommonService } from '../client.common-service';

const PROFILE = gql`
	query{
		getThisAccount {
			id
			name
			avatar_url
			cover_url
			describe
			email
			phone
			birthmonth
			birthyear
			# role
			# setting {
			# 	anonymous
			# 	birthmonth_privacy
			# 	birthyear_privacy
			# 	email_privacy
			# 	phone_privacy
			# }
			# status
			# updated_at
			created_at
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HomeHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	// fetchProfile() {
	// 	return this.apollo.use('accountManagementService').query<any>({
	// 		query: PROFILE,
	// 		context: {
	// 			headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
	// 		},
	// 		fetchPolicy: 'no-cache'
	// 	}).pipe(map(
	// 		({ data }): Profile => new Profile(data.getThisAccount)
	// 	));
	// }

	// updateProfile(profile: Profile) {
	// 	return this.apollo.use('accountManagementService').mutate<any>({
	// 		mutation: gql`
	// 			mutation{
	// 				editThisAccount(account:{
	// 					name: "${profile.name}"
	// 					describe: "${profile.describe}"
	// 					avatar_url: "${profile.avatarUrl}"
	// 					email: "${profile.email}"
	// 					phone: "${profile.phone}"
	// 					birthmonth: "${profile.birthmonth}"
	// 					birthyear: "${profile.birthyear}"
	// 				}){
	// 					status
	// 					describe
	// 				}
	// 		}`,
	// 		context: {
	// 			headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
	// 		}
	// 	}).pipe(map(
	// 		({ data }): AccountEditingResult => new AccountEditingResult(data.editThisAccount)
	// 	));
	// }
}
