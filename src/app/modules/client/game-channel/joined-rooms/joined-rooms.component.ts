import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { JoinedRoom } from './joined-rooms.dto';
import { JoinedRoomsHttpService } from './joined-rooms.http.service';

@Component({
	selector: 'app-joined-rooms',
	templateUrl: './joined-rooms.component.html',
	styleUrls: ['./joined-rooms.component.css']
})
export class JoinedRoomsComponent implements OnInit {
	private joinedRooms: JoinedRoom[] = [];

	constructor(private joinedRoomHttpService: JoinedRoomsHttpService) { }

	ngOnInit() {
		this.fetchJoinedRooms();
	}

	protected fetchJoinedRooms() {
		this.joinedRoomHttpService.fetchJoinedRooms().subscribe(data => {
			this.joinedRooms = data;
		});
	}
}
