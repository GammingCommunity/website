import { Component, OnInit, Injector } from '@angular/core';
import { ChatService } from 'src/app/common/services/chat.service';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { GameRoomsOptionsDropdownLanguage } from './game-rooms-options-dropdown.language';
import { ClientCommonComponent } from '../../../client.common-component';

@Component({
	selector: 'app-game-rooms-options-dropdown',
	templateUrl: './game-rooms-options-dropdown.component.html',
})
export class GameRoomsOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	private reloadRooms: () => void;
	private destroy: () => void;

	constructor(
		private injector: Injector,
	) {
		super(injector);
		GameRoomsOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.reloadRooms = data.reloadRooms;
	}

	ngOnInit() {
	}
}
