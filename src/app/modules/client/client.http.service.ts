import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MyFriend, MyProfile } from "./client.dto";
import { AuthService } from "src/app/common/services/auth.service";
import { GraphqlService } from "src/app/common/services/graphql.service";
import { ServiceUrls } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class ClientHttpService {
	readonly amsUrl: string = ServiceUrls.amSerive;

	constructor(
		private http: HttpClient,
		private graphQl: GraphqlService,
		private auth: AuthService
	) {}

	fetchProfile(callback: Function) {
		this.graphQl
			.query(this.amsUrl, `getThisAccount{ id, name, avatar_url }`, {
				token: this.auth.getSessionToken()
			})
			.subscribe(response => {
				if (response && response.data && response.data.getThisAccount) {
					callback(new MyProfile(response.data.getThisAccount));
				}
			});
	}

	fetchFriends(callback: Function) {
		this.graphQl
			.query(this.amsUrl, `getFriends{ friend{ id, name, avatar_url }}`, {
				token: this.auth.getSessionToken()
			})
			.subscribe(response => {
				if (
					response &&
					response.data &&
					response.data.getFriends &&
					response.data.getFriends
				) {
					let friends = [];
					const rawList = response.data.getFriends;

					rawList.forEach(item => {
						let rawFriend = item.friend;
						if (rawFriend) {
							friends.push(new MyFriend(rawFriend));
						}
					});

					callback(friends);
				}
			});
	}
}
