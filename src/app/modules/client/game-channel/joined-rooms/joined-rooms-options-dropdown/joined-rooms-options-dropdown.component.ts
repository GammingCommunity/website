import { Component, OnInit, Injector } from '@angular/core';
import { ChatService } from 'src/app/common/services/chat.service';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { ClientCommonComponent } from '../../../client.common-component';
import { JoinedRoomsOptionsDropdownLanguage } from './joined-rooms-options-dropdown.language';

@Component({
	selector: 'app-joined-rooms-options-dropdown',
	templateUrl: './joined-rooms-options-dropdown.component.html',
})
export class JoinedRoomsOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	reloadRooms: () => void;
	destroy: () => void;

	constructor(
		private injector: Injector,
	) {
		super(injector);
		JoinedRoomsOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
	}
	
	ngOnInit() {
		this.reloadRooms = () => this.clientDataService.reloadJoinedRooms();
	}
}
