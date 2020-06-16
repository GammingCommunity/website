import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GameRoom, Approve, ResultCRUD } from './game-rooms.dto';
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class GameRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchGameRooms(gameChannelId: string) {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomByGame(limit:100, page:1, gameID:"${gameChannelId}"){
						code
						_id
						roomName
						roomLogo
						roomBackground
						isJoin
						isPrivate
						isRequest
						maxOfMember
						countMember
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): GameRoom[] => {
				let rooms: GameRoom[] = [];

				data.getRoomByGame.forEach(room => {
					rooms.push(new GameRoom(room));
				})

				return rooms;
			}
		));
	}

	reloadRooms(gameChannelId: string) {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomByGame(limit:100, page:1, gameID:"${gameChannelId}"){
						code
						_id
						roomName
						roomLogo
						roomBackground
						isJoin
						isPrivate
						isRequest
						maxOfMember
						countMember
					}
				}
			`,
			fetchPolicy: 'no-cache',
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): GameRoom[] => {
				let rooms: GameRoom[] = [];

				data.getRoomByGame.forEach(room => {
					rooms.push(new GameRoom(room));
				})

				return rooms;
			}
		));
	}

	getPendingJoinRoom() {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getPendingJoinRoom_User{
						_id
						roomID
						isApprove
					}
				}
			`,
			fetchPolicy: 'no-cache',
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): Approve[] => {
				let approveList: Approve[] = [];

				data.getPendingJoinRoom_User.forEach(data => {
					approveList.push(new Approve(data));
				})

				return approveList;
			}
		));
	}

	joinRoom(room: GameRoom) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation{
					joinRoom(roomID:"${room.id}"){
						success
						message
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.joinRoom)));
	}

	cancelRoomRequest(approve: Approve) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation{
					cancelRequest(roomID:"${approve.roomId}", requestID:"${approve.requestId}"){
						success
						message
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.cancelRequest)));
	}
}
