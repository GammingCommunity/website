import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector } from '@angular/core';
import { JoinedRoomsComponent } from './joined-rooms/joined-rooms.component';
import { GameChannelLanguage } from './game-channel.language';
import { ClientCommonComponent } from '../client.common-component';
import { GameChannelHttpService } from './game-channel.http.service';

@Component({
	selector: 'app-game-channel',
	templateUrl: './game-channel.component.html',
	styleUrls: ['./game-channel.component.css']
})
export class GameChannelComponent extends ClientCommonComponent {
	@ViewChild('joinedRooms', { static: true }) joinedRoomsComponent: JoinedRoomsComponent;

	constructor(
		protected injector: Injector,
		protected gameChannelHttpService: GameChannelHttpService,
	) {
		super(injector);
		GameChannelLanguage.define(this.translateService);

		this.route.params.subscribe(param => {
			this.clientDataService.setCurrentGameChannelId(this.route.snapshot.params.id);
		});
		
	}
}
