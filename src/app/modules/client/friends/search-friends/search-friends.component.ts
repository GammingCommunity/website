import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SearchFriendsHttpService } from './search-friends.http.service';
import { AccountLookingResult, AccountRelationShipType } from './search-friends.dto';
import { Subscription } from 'rxjs';
import { ClientCommonComponent } from '../../client.common-component';
import { SearchFriendLanguage } from './search-friend.language';

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
					width: '800px',
					height: '600px'
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
export class SearchFriendsComponent extends ClientCommonComponent implements OnInit, OnDestroy {
	@ViewChild('container', { static: true }) containerER: ElementRef;
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	private destroy: () => void;
	private outFocusHandler: (event) => void;
	private searchKey: string = 'a';
	private lookedAccounts: AccountLookingResult[] = [];
	private readonly baseUrl: string = '/client';
	private readonly lookAccountUrl: string = '/look';
	private searchSubscription: Subscription;
	private accountRelationShipType = AccountRelationShipType;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private searchFriendsHttpService: SearchFriendsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		SearchFriendLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.addOutFocusListener();
	}

	search() {
		if (this.searchKey) {
			this.searchSubscription = this.searchFriendsHttpService.search(this.searchKey, this.loaderLocationVR).subscribe(lookedAccounts => {
				this.lookedAccounts = lookedAccounts;
			});
		}
	}

	ngOnDestroy() {
		this.removeOutFocusListenr();
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe();
		}
	}

	redirectToAccount(id) {
		// window.open(this.baseUrl + this.lookAccountUrl + '/' + id);
	}

	sendFriendRequest(id) {
		this.searchFriendsHttpService.sendFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	acceptFriendRequest(id) {
		this.searchFriendsHttpService.acceptFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	cancelFriendRequest(id) {
		this.searchFriendsHttpService.cancelFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	unsendFriendRequest(id) {
		this.searchFriendsHttpService.unsendFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	protected addOutFocusListener() {
		this.outFocusHandler = event => {
			if (!this.containerER.nativeElement.contains(event.target)) {
				this.destroy();
			}
		}
		this.viewContainerRef.element.nativeElement.addEventListener('click', this.outFocusHandler);
	}

	protected removeOutFocusListenr() {
		this.viewContainerRef.element.nativeElement.removeEventListener('click', this.outFocusHandler);
	}
}
