import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { SearchRoomsHttpService } from './search-rooms.http.service';
import { ClientCommonComponent } from '../../../client.common-component';
import { SearchRoomsLanguage } from './search-rooms.language';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-search-rooms',
	templateUrl: './search-rooms.component.html',
	styleUrls: ['./search-rooms.component.css']
})
export class SearchRoomsComponent extends ClientCommonComponent implements OnInit, OnDestroy {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	private destroy: () => void;
	private searchKey: string = '';
	private searchSubscription: Subscription;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private searchRoomsHttpService: SearchRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		SearchRoomsLanguage.define(this.translateService);
	}

	// protected hideClickedELement(event) {
	// 	event.target.style.display = 'none';
	// 	this.translateService.get('SearchFriendLanguage.REQUESTED').subscribe(text => event.target.parentElement.innerHTML = text);
	// }

	ngOnInit() {

	}

	search() {
		this.unsubcribeSearch();
		// this.lookedAccounts = [];

		// if (this.searchKey) {
		// 	this.searchSubscription = this.SearchSearchRoomsHttpService.search(this.searchKey, this.loaderLocationVR).subscribe(lookedAccounts => {
		// 		this.lookedAccounts = lookedAccounts;
		// 	});
		// }
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
			this.searchKey = '';
		}
	}
}
