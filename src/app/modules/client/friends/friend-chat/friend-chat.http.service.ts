import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Friend } from './friend-chat.dto';

@Injectable({
	providedIn: "root"
})
export class FriendChatHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
	}

	// fetchFriend(id: number) {
	// 	return this.apollo.use('accountManagementService').query<any>({
	// 		query: gql`
	// 			query{
	// 				lookAccount(ids:[${id}]){
	// 					account{
	// 						id
	// 						name
	// 						avatar_url
	// 					}
	// 				}
	// 			}
	// 		`,
	// 		context: {
	// 			headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
	// 		}
	// 	}).pipe(map(
	// 		({ data }): Friend => new Friend(data.lookAccount[0].account)
	// 	));
	// }

	
}
