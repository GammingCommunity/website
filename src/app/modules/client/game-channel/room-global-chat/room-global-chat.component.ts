import { Component, OnInit, Injector } from '@angular/core';
import { ClientCommonComponent } from '../../client.common-component';
import { RoomGlobalChatLanguage } from './room-global-chat.language';

@Component({
	selector: 'app-room-global-chat',
	templateUrl: './room-global-chat.component.html',
	styleUrls: ['./room-global-chat.component.css']
})
export class RoomGlobalChatComponent extends ClientCommonComponent implements OnInit {
	private searchKey: string;

	constructor(protected injector: Injector) {
		super(injector);
		RoomGlobalChatLanguage.define(this.translateService);
	}

	ngOnInit() {
	}


	handleEnterToSearch(event: KeyboardEvent) {
		if (event.keyCode === 13) {
			event.preventDefault();
			
			if(this.searchKey.toLocaleLowerCase() === 'view'){
				console.log(this.dialogService.getViewContainerRef());
				this.searchKey = '';
			}
		}
	}
}
