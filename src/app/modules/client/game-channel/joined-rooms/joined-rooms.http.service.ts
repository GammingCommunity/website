import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JoinedRoom } from './joined-rooms.dto';
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class JoinedRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchJoinedRooms() {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomJoin{
						code
						_id
						roomName
						roomLogo
					}
				}
			`,
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
