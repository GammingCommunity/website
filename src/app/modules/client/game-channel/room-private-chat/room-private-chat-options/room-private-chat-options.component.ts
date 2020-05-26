import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'app-room-private-chat-options',
	templateUrl: './room-private-chat-options.component.html',
	styleUrls: ['./room-private-chat-options.component.css'],
	animations: [
		trigger('changeContainerState', [
			state('expand', style({
				width: '260px',
				minWidth: '260px'
			})),
			state('collapse', style({
				width: '0px',
				minWidth: '0px'
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		])
	]
})
export class RoomPrivateChatOptionsComponent implements OnInit {
	private containerState: string = 'expand';

	constructor() { }

	ngOnInit() {
	}


	resizeContainer() {
		if (this.containerState === 'expand') {
			this.containerState = 'collapse';
		} else {
			this.containerState = 'expand';
		};
	}
}
