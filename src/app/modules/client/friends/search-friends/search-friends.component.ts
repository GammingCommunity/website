import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SearchFriendsHttpService } from './search-friends.http.service';
import { AccountLookingResult, AccountRelationShipType } from './search-friends.dto';
import { Subscription } from 'rxjs';
import { ClientCommonComponent } from '../../client.common-component';
import { SearchFriendLanguage } from './search-friend.language';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-search-friends',
	templateUrl: './search-friends.component.html',
	styleUrls: ['./search-friends.component.css'],
	animations: [
		trigger('containerSizeStyle', [
			state('expand', style({
				height: '700px'
			})),
			state('collapse', style({
				height: '250px'
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		])
	]
})
export class SearchFriendsComponent extends ClientCommonComponent implements OnChanges, OnInit, OnDestroy {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	private destroy: () => void;
	private searchKey: string = '';
	private lookedAccounts: AccountLookingResult[] = [];
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

	ngOnChanges() {
		alert(this.lookedAccounts.length);
	}

	protected hideClickedELement(event) {
		event.target.style.display = 'none';
		event.target.parentElement.innerHTML = this.translateService.instant('SearchFriendLanguage.REQUESTED')
	}

	ngOnInit() {

	}

	search() {
		this.unsubcribeSearch();
		this.lookedAccounts = [];

		if (this.searchKey) {
			this.searchSubscription = this.searchFriendsHttpService.search(this.searchKey, this.loaderLocationVR).subscribe(lookedAccounts => {
				this.lookedAccounts = lookedAccounts;
			});
		}
		this.searchKey = '';
	}

	ngOnDestroy() {
		this.unsubcribeSearch();
	}

	protected unsubcribeSearch() {
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe();
			this.searchSubscription = null;
		}
	}

	sendFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;

		this.searchFriendsHttpService.sendFriendRequest(lookedAccount.id)
			.pipe(finalize(() => {
				lookedAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					lookedAccount.relationship = this.accountRelationShipType.FRIEND_REQUEST;
				}
			});
	}

	acceptFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.acceptFriendRequest(lookedAccount.id)
			.pipe(finalize(() => {
				lookedAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					lookedAccount.relationship = this.accountRelationShipType.FRIEND;
				}
			});
	}

	cancelFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.cancelFriendRequest(lookedAccount.id)
			.pipe(finalize(() => {
				lookedAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					lookedAccount.relationship = this.accountRelationShipType.STRANGER;
				}
			});
	}

	unsendFriendRequest(lookedAccount: AccountLookingResult) {
		lookedAccount.isRequesting = true;
		this.searchFriendsHttpService.unsendFriendRequest(lookedAccount.id)
			.pipe(finalize(() => {
				lookedAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					lookedAccount.relationship = this.accountRelationShipType.STRANGER;
				}
			});
	}

	handleEnterToSearch(event: KeyboardEvent) {
		if (this.searchKey.length > 0 && event.keyCode === 13) {
			event.preventDefault();
			this.search();
		}
	}
}
