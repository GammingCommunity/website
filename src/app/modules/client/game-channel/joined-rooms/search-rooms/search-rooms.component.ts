import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { SearchRoomsHttpService } from './search-rooms.http.service';
import { ClientCommonComponent } from '../../../client.common-component';
import { SearchRoomsLanguage } from './search-rooms.language';
import { Subscription } from 'rxjs';
import { LittleGameChannel } from '../../game-channel.dto';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SearchRoomOptionEnum, Room } from './search-rooms.dto';

@Component({
	selector: 'app-search-rooms',
	templateUrl: './search-rooms.component.html',
	styleUrls: ['./search-rooms.component.css'],
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
export class SearchRoomsComponent extends ClientCommonComponent implements OnInit, OnDestroy {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	private gameChannels: LittleGameChannel[];
	private rooms: Room[] = [];
	private destroy: () => void;
	private searchKey: string = '';
	private searchSubscription: Subscription;
	private searchOption: string;
	private searchRoomOptionEnum = SearchRoomOptionEnum;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private searchRoomsHttpService: SearchRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		const data = this.injector.get('data');
		SearchRoomsLanguage.define(this.translateService);

		this.gameChannels = data.gameChannels;
		this.searchOption = this.searchRoomOptionEnum.SEARCH_BY_NAME;
	}

	// protected hideClickedELement(event) {
	// 	event.target.style.display = 'none';
	// 	this.translateService.get('SearchFriendLanguage.REQUESTED').subscribe(text => event.target.parentElement.innerHTML = text);
	// }

	ngOnInit() {

	}

	search() {
		this.unsubcribeSearch();
		this.rooms = [];

		if (this.searchKey) {
			this.searchSubscription = this.searchRoomsHttpService.search(this.searchKey, this.searchOption, this.loaderLocationVR).subscribe(data => {
				this.rooms = data;
			});
		}
		this.searchKey = '';
	}

	ngOnDestroy() {
		this.unsubcribeSearch();
	}

	protected unsubcribeSearch(){
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe();
			this.searchSubscription = null;
		}
	}

	handleEnterToSearch(event: KeyboardEvent) {
		if (this.searchKey.length > 0 && event.keyCode === 13) {
			event.preventDefault();
			this.search();
		}
	}
}
