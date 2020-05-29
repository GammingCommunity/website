import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { JoinedRoom } from './joined-rooms.dto';
import { JoinedRoomsHttpService } from './joined-rooms.http.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RoomPrivateChatUIService } from '../room-private-chat/room-private-chat.ui.service';
import { TranslateService } from '@ngx-translate/core';
import { JoinedRoomsLanguage } from './joined-rooms.language';
import { ClientCommonComponent } from '../../client.common-component';

@Component({
	selector: 'app-joined-rooms',
	templateUrl: './joined-rooms.component.html',
	styleUrls: ['./joined-rooms.component.css'],
	animations: [
		trigger('changeContainerState', [
			state('expand', style({
				width: '300px'
			})),
			state('collapse', style({
				width: '100px'
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		])
	]
})
export class JoinedRoomsComponent extends ClientCommonComponent implements OnInit {
	private joinedRooms: JoinedRoom[] = [];
	private containerState: string = 'expand';
	public showPrivateChat: (data: any) => void;

	constructor(
		protected injector: Injector,
		private joinedRoomHttpService: JoinedRoomsHttpService
	) {
		super(injector);
		JoinedRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchJoinedRooms();
	}

	resizeContainer() {
		if (this.containerState === 'expand') {
			this.containerState = 'collapse';
		} else {
			this.containerState = 'expand';
		};
	}

	protected fetchJoinedRooms() {
		this.joinedRoomHttpService.fetchJoinedRooms().subscribe(data => {
			this.joinedRooms = data;
		});
	}
}
