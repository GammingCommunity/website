import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AccountLookingResult } from './look-account.dto';

@Injectable({
	providedIn: "root"
})
export class LookAccountHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
	}


	sendFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					sendFriendRequest(receiver_id: ${id})
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.sendFriendRequest
		));
	}

	unsendFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					removeFriendRequest(receiver_id: ${id})
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.removeFriendRequest
		));
	}

	acceptFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					confirmFriendRequest(sender_id: ${id}, is_confirm: true)
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.confirmFriendRequest
		));
	}

	cancelFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					confirmFriendRequest(sender_id: ${id}, is_confirm: false)
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.confirmFriendRequest
		));
	}


	look(id: number) {
		return this.apollo.use('accountManagementService').query<any>({
			query: gql`
				query 
				{
					lookAccount(ids: [${id}]){
						account{
							id
							name
							avatar_url
							describe
							email
							phone
							birthmonth
							birthyear
							created_at
						}
						relationship
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): AccountLookingResult => new AccountLookingResult(data.lookAccount[0])
		));
	}
}
