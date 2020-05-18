import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JoinedRoom } from './joined-rooms.dto';

const JOINED_ROOMS = gql`
  	query{
		getRoomJoin{
			_id
			roomName
			roomLogo
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class JoinedRoomsHttpService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		private apollo: Apollo,
		private auth: AuthService
	) {
		this.ssToken = this.auth.getSessionToken();
		this.tokenTitle = this.auth.getTokenTitle();
	}

	fetchJoinedRooms() {
		return this.apollo.use('mainService').query<any>({
			query: JOINED_ROOMS,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): JoinedRoom[] => {
				let rooms: JoinedRoom[] = [];

				data.getRoomJoin.forEach(room => {
					rooms.push(new JoinedRoom(room));
				})

				return rooms;
			}
		));
	}
}
