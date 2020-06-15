import { Component, OnInit, Injector } from '@angular/core';
import { GameRoomsHttpService } from './game-rooms.http.service';
import { GameRoom } from './game-rooms.dto';
import { ChatService } from 'src/app/common/services/chat.service';
import { ClientCommonComponent } from '../../client.common-component';
import { GameRoomsLanguage } from './game-rooms.language';

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
		const currentGameChannel = this.clientDataService.getCurrentGameChannel(this.homeUrl);
		if(currentGameChannel.id){
			this.gameRoomHttpService.fetchGameRooms(currentGameChannel.id).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	joinRoom(room: GameRoom){
		room.isRequestingFromClient = true;
		
	}

	// sendButtonClick() {
	// 	this.chatService.onRequest().subscribe(data => {
	// 		console.log('data');
	// 		console.log(data);
	// 	});
	// }
}
