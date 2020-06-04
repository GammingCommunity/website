import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
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
					height: '0px'
				}),
				animate('100ms ease', style({
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
	private searchKey: string = '';
	private lookedAccounts: AccountLookingResult[] = [];
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

	protected hideClickedELement(event) {
		event.target.style.display = 'none';
		this.translateService.get('SearchFriendLanguage.REQUESTED').subscribe(text => event.target.parentElement.innerHTML = text);
	}

	ngOnInit() {
		this.addOutFocusListener(this.viewContainerRef, this.containerER, event => this.destroy());
	}

	search() {
		if (this.searchKey) {
			this.searchSubscription = this.searchFriendsHttpService.search(this.searchKey, this.loaderLocationVR).subscribe(lookedAccounts => {
				this.lookedAccounts = lookedAccounts;
			});
		}
	}

	ngOnDestroy() {
		this.removeOutFocusListenr(this.viewContainerRef);
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe();
		}
	}

	sendFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;

		this.searchFriendsHttpService.sendFriendRequest(lookedAccount.id).subscribe(result => {
			if (result) {
				lookedAccount.relationship = this.accountRelationShipType.FRIEND_REQUEST;
			}
			lookedAccount.isRequesting = false;
		});
	}

	acceptFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.acceptFriendRequest(lookedAccount.id).subscribe(result => {
			if (result) {
				lookedAccount.relationship = this.accountRelationShipType.FRIEND;
			}
			lookedAccount.isRequesting = false;
		});
	}

	cancelFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.cancelFriendRequest(lookedAccount.id).subscribe(result => {
			if (result) {
				lookedAccount.relationship = this.accountRelationShipType.STRANGER;
			}
			lookedAccount.isRequesting = false;
		});
	}

	unsendFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.unsendFriendRequest(lookedAccount.id).subscribe(result => {
			if (result) {
				lookedAccount.relationship = this.accountRelationShipType.STRANGER;
			}
			lookedAccount.isRequesting = false;
		});
	}

	handleEnterToSearch(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.search();
			this.loaderLocationVR.element.nativeElement.focus();
		}
	}
}
