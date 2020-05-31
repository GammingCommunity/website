import { Component, OnInit, ViewContainerRef, Injector } from '@angular/core';
import { RoomPrivateChatUIService } from './room-private-chat.ui.service';
import { RoomPrivateChatLanguage } from './room-private-chat.language';
import { ClientCommonComponent } from '../../client.common-component';

@Component({
	selector: 'app-room-private-chat',
	templateUrl: './room-private-chat.component.html',
	styleUrls: ['./room-private-chat.component.css']
})
export class RoomPrivateChatComponent extends ClientCommonComponent implements OnInit {

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private roomPrivateChatUIService: RoomPrivateChatUIService
	) {
		super(injector);
		RoomPrivateChatLanguage.define(this.translateService);
		this.roomPrivateChatUIService.showPrivateChatFunc = data => {
			this.show();
		}
	}

	ngOnInit() {
	}

	hide() {
		this.viewContainerRef.element.nativeElement.style.display = 'none';
	}

	show() {
		this.viewContainerRef.element.nativeElement.style.display = 'block';
	}
}
