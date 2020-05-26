import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchFriendsHttpService } from './search-friends.http.service';
import { AccountLookingResult } from './search-friends.dto';

@Component({
	selector: 'app-search-friends',
	templateUrl: './search-friends.component.html',
	styleUrls: ['./search-friends.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({
					width: '0px',
					height: '0px'
				}),
				animate('100ms ease', style({
					width: '400px',
					height: '300px'
				}))
			]),
			transition(':leave', [
				animate('100ms ease', style({
					width: '0px',
					height: '0px'
				}))
			])
		])
	],
})
export class SearchFriendsComponent implements OnInit {
	private destroy: () => void;
	private searchKey: string;
	private lookdAccounts: AccountLookingResult[] = [];

	constructor(
		private injector: Injector,
		private alertService: AlertService,
		private searchFriendsHttpService: SearchFriendsHttpService
	) {
		this.destroy = this.injector.get('destroy');
	}

	ngOnInit() {
	}

	search() {
		if (this.searchKey) {
			this.searchFriendsHttpService.search(this.searchKey).subscribe(lookedAccounts => {
				this.lookdAccounts = lookedAccounts;
				console.log(lookedAccounts);
			});
		}
	}
}
