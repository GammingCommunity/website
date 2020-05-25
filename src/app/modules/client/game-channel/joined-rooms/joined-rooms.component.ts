import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { JoinedRoom } from './joined-rooms.dto';
import { JoinedRoomsHttpService } from './joined-rooms.http.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class JoinedRoomsComponent implements OnInit {
	private joinedRooms: JoinedRoom[] = [];
	private containerState: string = 'expand';

	constructor(private joinedRoomHttpService: JoinedRoomsHttpService) { }

	ngOnInit() {
		this.fetchJoinedRooms();
	}

	resizeContainer() {
		if (this.containerState === 'expand'){
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
