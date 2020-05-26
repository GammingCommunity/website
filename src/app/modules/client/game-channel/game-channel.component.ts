import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RoomPrivateChatUIService } from './room-private-chat/room-private-chat.ui.service';
import { JoinedRoomsComponent } from './joined-rooms/joined-rooms.component';

@Component({
	selector: 'app-game-channel',
	templateUrl: './game-channel.component.html',
	styleUrls: ['./game-channel.component.css']
})
export class GameChannelComponent implements AfterViewInit {
	@ViewChild('joinedRooms', { static: true }) joinedRoomsComponent: JoinedRoomsComponent;

	
	constructor(private roomPrivateChatUIService: RoomPrivateChatUIService) { }

	ngAfterViewInit() {
		this.joinedRoomsComponent.showPrivateChat = this.roomPrivateChatUIService.showPrivateChatFunc;
	}

}
