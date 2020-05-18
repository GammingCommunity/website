import { Component, OnInit, HostListener, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { JoinedRoom } from './joined-rooms.dto';
import { JoinedRoomsHttpService } from './joined-rooms.http.service';
import { DialogService } from 'src/app/common/dialogs/popup/popup.service';
import { LoaderComponent } from 'src/app/common/dialogs/loader/loader.component';
import { ProfileDropdownComponent } from '../../profile-dropdown/profile-dropdown.component';

@Component({
	selector: 'app-joined-rooms',
	templateUrl: './joined-rooms.component.html',
	styleUrls: ['./joined-rooms.component.css']
})
export class JoinedRoomsComponent implements OnInit {
	@ViewChild('dropdown', { static: true }) dropdown: ElementRef
	private joinedRooms: JoinedRoom[] = [];

	constructor(
		private joinedRoomHttpService: JoinedRoomsHttpService,
		private dialogService: DialogService
	) {
	}

	ngOnInit() {
		this.fetchJoinedRooms();
		this.dialogService.putDialogComponentToComponent(ProfileDropdownComponent, 'hello world');
	}

	protected fetchJoinedRooms() {
		this.joinedRoomHttpService.fetchJoinedRooms().subscribe(data => {
			this.joinedRooms = data;
		});
	}
}
