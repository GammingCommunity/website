import { Component, OnInit, ViewContainerRef, Injector } from '@angular/core';
import { RoomPrivateChatLanguage } from './room-private-chat.language';
import { ClientCommonComponent } from '../../client.common-component';
import { GameChannelDataService } from '../game-channel.data.service';

@Component({
	selector: 'app-room-private-chat',
	templateUrl: './room-private-chat.component.html',
	styleUrls: ['./room-private-chat.component.css']
})
export class RoomPrivateChatComponent extends ClientCommonComponent implements OnInit {

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private gameChannelDataService: GameChannelDataService
	) {
		super(injector);
		RoomPrivateChatLanguage.define(this.translateService);

		this.gameChannelDataService.setShowPrivateChatHandler((roomID: string) => {
			this.show(roomID);
		});
	}

	ngOnInit() {
	}

	hide() {
		this.viewContainerRef.element.nativeElement.style.display = 'none';
	}

	show(roomID: string) {
		this.viewContainerRef.element.nativeElement.style.display = 'block';
	}
}
