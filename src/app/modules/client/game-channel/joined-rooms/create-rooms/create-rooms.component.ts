import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { ClientCommonComponent } from '../../../client.common-component';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { RoomInput } from './create-rooms.dto';
import { CreateRoomsLanguage } from './create-rooms.language';
import { CreateRoomsHttpService } from './create-rooms.http.service';

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

	constructor(
		protected injector: Injector,
		private createRoomsHttpService: CreateRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		const data = this.injector.get('data');
		CreateRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {

	}

	createRoom() {
		this.createRoomsHttpService.create(this.roomInput).subscribe(data => {
			console.log(data);
		});
	}
}
