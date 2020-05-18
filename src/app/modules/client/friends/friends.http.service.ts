import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { MyFriend } from "./friends.dto";
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const MY_FRIENDS = gql`
  	query 
	{
		getFriends{ friend{ id, name, avatar_url }}
	}
`;

@Injectable({
	providedIn: "root"
})
export class FriendsHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
	}

	fetchFriends() {
		return this.apollo.use('accountManagementService').query<any>({
			query: MY_FRIENDS,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): MyFriend[] => {
				let friends: MyFriend[] = [];

				data.getFriends.forEach(friend => {
					friends.push(new MyFriend(friend.friend));
				})

				return friends;
			}
		));
	}
}
