import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector } from '@angular/core';
import { RoomPrivateChatUIService } from './room-private-chat/room-private-chat.ui.service';
import { JoinedRoomsComponent } from './joined-rooms/joined-rooms.component';
import { GameChannelLanguage } from './game-channel.language';
import { ClientCommonComponent } from '../client.common-component';

@Component({
	selector: 'app-game-channel',
	templateUrl: './game-channel.component.html',
	styleUrls: ['./game-channel.component.css']
})
export class GameChannelComponent extends ClientCommonComponent implements AfterViewInit {
	@ViewChild('joinedRooms', { static: true }) joinedRoomsComponent: JoinedRoomsComponent;


	constructor(
		protected injector: Injector,
		private roomPrivateChatUIService: RoomPrivateChatUIService
	) {
		super(injector);
		GameChannelLanguage.define(this.translateService);
	}

	ngAfterViewInit() {
		this.joinedRoomsComponent.showPrivateChat = this.roomPrivateChatUIService.showPrivateChatFunc;
	}

}
