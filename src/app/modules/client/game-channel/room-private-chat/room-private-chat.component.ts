import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RoomPrivateChatUIService } from './room-private-chat.ui.service';

@Component({
	selector: 'app-room-private-chat',
	templateUrl: './room-private-chat.component.html',
	styleUrls: ['./room-private-chat.component.css']
})
export class RoomPrivateChatComponent implements OnInit {

	constructor(private roomPrivateChatUIService: RoomPrivateChatUIService, private viewContainerRef: ViewContainerRef) {
		this.roomPrivateChatUIService.showPrivateChatFunc = data => {
			this.show();
		}
	}

	ngOnInit() {
	}

	hide(){
		this.viewContainerRef.element.nativeElement.style.display = 'none';
	}

	show(){
		this.viewContainerRef.element.nativeElement.style.display = 'block';
	}
}
