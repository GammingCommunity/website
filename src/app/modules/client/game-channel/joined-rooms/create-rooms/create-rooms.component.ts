import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy, AfterContentInit } from '@angular/core';
import { ClientCommonComponent } from '../../../client.common-component';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { RoomInput } from './create-rooms.dto';
import { CreateRoomsLanguage } from './create-rooms.language';
import { CreateRoomsHttpService } from './create-rooms.http.service';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';

@Component({
	selector: 'app-create-rooms',
	templateUrl: './create-rooms.component.html',
	styleUrls: ['./create-rooms.component.css'],
	animations: [
		trigger('containerSizeStyle', [
			state('expand', style({
				height: '800px'
			})),
			state('collapse', style({
				height: '250px'
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		])
	]
})
export class CreateRoomsComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	private roomInput: RoomInput;
	private destroy: () => void;
	private maxMemberList_temp: number[] = [2, 4, 6, 8, 10, 12, 16, 20, 30];

	constructor(
		protected injector: Injector,
		private createRoomsHttpService: CreateRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		const data = this.injector.get('data');
		CreateRoomsLanguage.define(this.translateService);
	}

	ngOnInit(){
		this.roomInput = new RoomInput();
		this.roomInput.maxMember = 8;
		this.roomInput.isPrivate = false;
		this.roomInput.describe = 'Tôi yêu quê hương Việt Nam';
	}
	
	createRoom() {
		const gameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if(gameChannelId){
			this.createRoomsHttpService.create(this.roomInput, gameChannelId).subscribe(result => {
				if(result.success){
					this.clientDataService.reloadGameRooms();
					this.destroy();
				} else {
					SwtAlert.display({
						title: result.message,
						icon: 'warning'
					})
				}
			});
		} else {
			this.destroy();
		}
	}
}
