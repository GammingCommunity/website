import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServiceUrls } from 'src/environments/environment';
import { AccountLookingResult } from './search-friends.dto';

@Injectable({
	providedIn: "root"
})
export class SearchFriendsHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;
	readonly feedbackUrl: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
		this.feedbackUrl = ServiceUrls.feedback;
	}

	search(searchKey: string) {
		return this.apollo.use('accountManagementService').query<any>({
			query: gql`
				query 
				{
					searchAccounts(key: "${searchKey}"){
						account{
							id
							name
							avatar_url
							describe
						}
						relationship
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): AccountLookingResult[] => {
				let accountLookingResults: AccountLookingResult[] = [];

				data.searchAccounts.forEach(accountLookingResult => {
					accountLookingResults.push(new AccountLookingResult(accountLookingResult));
				})

				return accountLookingResults;
			}
		));
	}
}
