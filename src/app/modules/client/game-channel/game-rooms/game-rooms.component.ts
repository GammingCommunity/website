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
	msgInput: string = 'lorem ipsum';

	constructor(
		private injector: Injector,
		private chatService: ChatService,
		private gameRoomHttpService: GameRoomsHttpService
	) {
		super(injector);
		GameRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchGameRooms();

		// this.chatService.requestId();
		// this.sendButtonClick();
	}

	protected fetchGameRooms() {
		this.gameRoomHttpService.fetchGameRooms().subscribe(data => {
			this.gameRooms = data;
		});
	}

	sendButtonClick() {
		this.chatService.onRequest().subscribe(data => {
			console.log('data');
			console.log(data);
		});
	}
}
