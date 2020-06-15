import { Component, OnInit, Injector } from '@angular/core';
import { GameRoomsHttpService } from './game-rooms.http.service';
import { GameRoom } from './game-rooms.dto';
import { ChatService } from 'src/app/common/services/chat.service';
import { ClientCommonComponent } from '../../client.common-component';
import { GameRoomsLanguage } from './game-rooms.language';
import { SweetAlert } from 'src/app/common/helpers/sweet_alert';

@Component({
	selector: 'app-game-rooms',
	templateUrl: './game-rooms.component.html',
	styleUrls: ['./game-rooms.component.css']
})
export class GameRoomsComponent extends ClientCommonComponent implements OnInit {
	private gameRooms: GameRoom[] = [];
	// msgInput: string = 'lorem ipsum';

	constructor(
		private injector: Injector,
		// private chatService: ChatService,
		private gameRoomHttpService: GameRoomsHttpService
	) {
		super(injector);
		GameRoomsLanguage.define(this.translateService);

		this.fetchGameRooms();
	}

	ngOnInit() {

		// this.chatService.requestId();
		// this.sendButtonClick();
	}

	protected fetchGameRooms() {
		const currentGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if (currentGameChannelId) {
			this.gameRoomHttpService.fetchGameRooms(currentGameChannelId).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	joinRoom(room: GameRoom) {
		SweetAlert.display({
			title: 'Are you sure!',
			buttons: true,
		}).then((isJoin) => {
			if (isJoin) {
				room.isRequestingFromClient = true;
				this.gameRoomHttpService.joinRoom(room).subscribe(result => {
					room.isRequestingFromClient = false;
					if(result.success){
						room.isRequesting = true;
					}
				})
			}
		});
	}

	// sendButtonClick() {
	// 	this.chatService.onRequest().subscribe(data => {
	// 		console.log('data');
	// 		console.log(data);
	// 	});
	// }
}
