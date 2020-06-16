import { Component, OnInit, Injector } from '@angular/core';
import { ChatService } from 'src/app/common/services/chat.service';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { ClientCommonComponent } from '../../../client.common-component';
import { GameRoom } from '../game-rooms.dto';
import { GameRoomsItemOptionsDropdownLanguage } from './game-rooms-item-options-dropdown.language';

@Component({
	selector: 'app-game-rooms-item-options-dropdown',
	templateUrl: './game-rooms-item-options-dropdown.component.html',
})
export class GameRoomsItemOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	private room: GameRoom;
	private destroy: () => void;
	private joinRoomHandler: () => void;
	private cancelRoomHandler: () => void;

	constructor(
		private injector: Injector,
	) {
		super(injector);
		GameRoomsItemOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');

		this.room = data.room;
		this.joinRoomHandler = data.joinRoomHandler;
		this.cancelRoomHandler = data.cancelRoomHandler;
	}

	ngOnInit() {
	}
}
