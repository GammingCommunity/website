import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { SearchRoomsHttpService } from './search-rooms.http.service';
import { ClientCommonComponent } from '../../../client.common-component';
import { SearchRoomsLanguage } from './search-rooms.language';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SearchRoomOptionEnum, Room } from './search-rooms.dto';

@Component({
	selector: 'app-search-rooms',
	templateUrl: './search-rooms.component.html',
	styleUrls: ['./search-rooms.component.css'],
	animations: [
		trigger('containerSizeStyle', [
			state('expand', style({
				height: '800px',
				width: '900px',
				opacity: 1,
			})),
			state('collapse', style({
				height: '250px',
				width: '600px',
				opacity: 1,
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		])
	]
})
export class SearchRoomsComponent extends ClientCommonComponent implements OnInit, OnDestroy {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	rooms: Room[] = [];
	destroy: () => void;
	searchKey: string = '';
	searchSubscription: Subscription;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private searchRoomsHttpService: SearchRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		const data = this.injector.get('data');
		SearchRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {

	}

	search() {
		this.unsubcribeSearch();
		this.rooms = [];

		if (this.searchKey) {
			this.searchSubscription = this.searchRoomsHttpService.search(this.searchKey, this.loaderLocationVR).subscribe(data => {
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
