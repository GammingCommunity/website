import { Component, OnInit, Injector, Input } from '@angular/core';
import { GameRoomsHttpService } from './game-rooms.http.service';
import { GameRoom } from './game-rooms.dto';
import { ChatService } from 'src/app/common/services/chat.service';
import { ClientCommonComponent } from '../../client.common-component';
import { GameRoomsLanguage } from './game-rooms.language';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { GameRoomsOptionsDropdownComponent } from './game-rooms-options-dropdown/game-rooms-options-dropdown.component';
import { CssConfigs } from 'src/environments/environment';
import { LookAccountOptionsDropdownComponent } from '../../look-account/look-account-options-dropdown/look-account-options-dropdown.component';
import { GameRoomsItemOptionsDropdownComponent } from './game-rooms-item-options-dropdown/game-rooms-item-options-dropdown.component';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-game-rooms',
	templateUrl: './game-rooms.component.html',
	styleUrls: ['./game-rooms.component.css']
})
export class GameRoomsComponent extends ClientCommonComponent implements OnInit {
	private gameRooms: GameRoom[] = [];

	// msgInput: string = 'lorem ipsum';

	constructor(
		private injector: Injector,
		// private chatService: ChatService,
		private gameRoomHttpService: GameRoomsHttpService
	) {
		super(injector);
		GameRoomsLanguage.define(this.translateService);

		this.fetchGameRooms();
	}

	ngOnInit() {

		// this.chatService.requestId();
		// this.sendButtonClick();
	}

	showGameRoomsOptionsDropdownDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: GameRoomsOptionsDropdownComponent,
			anchorElement: event.target,
			anchorTo: "right",
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-3 px-2 bg6',
				width: 230,
				useExitBtn: false
			},
			data: {
				reloadRooms: () => this.reloadRooms()
			}
		});
	}

	reloadRooms() {
		const currentGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if (currentGameChannelId) {
			this.gameRoomHttpService.reloadRooms(currentGameChannelId).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	protected fetchGameRooms() {
		const currentGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if (currentGameChannelId) {
			this.gameRoomHttpService.fetchGameRooms(currentGameChannelId).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	handleRoomItemsClick(room: GameRoom, event: MouseEvent) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: GameRoomsItemOptionsDropdownComponent,
			anchorTo: 'left',
			anchorElement: event.target,
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			},
			data: {
				room: room,
				joinRoomHandler: () => {
					if (room.hasJoined) {

					} else {
						room.isRequestingFromClient = true;
						this.gameRoomHttpService.joinRoom(room)
							.pipe(finalize(() => {
								room.isRequestingFromClient = false;
							})
							).subscribe(result => {
								if (result.success) {
									room.isRequesting = true;
								}
							})
					}
				},
				cancelRoomHandler: () => {
					room.isRequestingFromClient = true;
					this.gameRoomHttpService.getPendingJoinRoom()
						.pipe(finalize(() => {
							room.isRequestingFromClient = false;
						})).subscribe(approveList => {
							const approve = approveList.find(approve => approve.roomId === room.id);
							if (approve) {
								if (approve.isApprove) {
									this.reloadRooms();
								} else {
									this.gameRoomHttpService.cancelRoomRequest(approve)
										.pipe(finalize(() => {
											room.isRequestingFromClient = false;
										})).subscribe(result => {
											if (result.success) {
												room.isRequesting = false;
											}
										})
								}
							} else {
								this.alertService.show('something went wrong!');
							}
						})
				},
			}
		});
	}

	// sendButtonClick() {
	// 	this.chatService.onRequest().subscribe(data => {
	// 		console.log('data');
	// 		console.log(data);
	// 	});
	// }
}
