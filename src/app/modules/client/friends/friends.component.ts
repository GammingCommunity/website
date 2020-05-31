import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { MyFriend } from './friends.dto';
import { FriendsHttpService } from './friends.http.service';
import { FriendChatUIService } from './friend-chat/friend-chat.ui.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { SearchFriendsUIService } from './search-friends/search-friends.ui.service';
import { ClientCommonComponent } from '../client.common-component';
import { FriendsLanguage } from './friends.language';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.css'],
	animations: [
		trigger('changeFriendsContainerState', [
			state('expand', style({
				padding: '15px',
				width: '300px'
			})),
			state('collapse', style({
				width: '60px',
				padding: '0px',
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		]),
		trigger('changeChatBoxState', [
			state('expand', style({
				width: '360px'
			})),
			state('middle-expand', style({
				width: '240px'
			})),
			state('collapse', style({
				width: '0px'
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		])
	]
})
export class FriendsComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('searchFriendBtn', { static: true }) searchFriendBtnER: ElementRef;
	private mainContainerIsExpanding: boolean = true;
	private chatBoxIsOpening: boolean = false;
	private friendsContainerState: string = 'expand';
	private chatBoxState: string = 'middle-expand';
	private friends: MyFriend[] = [];

	constructor(
		protected injector: Injector,
		private friendsHttpService: FriendsHttpService,
		private searchFriendsUIService: SearchFriendsUIService,
		private friendChatUIService: FriendChatUIService
	) {
		super(injector);
		FriendsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchFriends();
		this.initSearchFriendsPopup();
	}

	openChatBox(selectedFriend: MyFriend) {
		this.friendChatUIService.showChatBoxFunc(selectedFriend);
		this.expandChatBox();
	}

	resizeMainContainer() {
		this.mainContainerIsExpanding = !this.mainContainerIsExpanding;

		if (this.mainContainerIsExpanding) {
			if (this.chatBoxIsOpening) {
				this.chatBoxState = 'expand';
				this.friendsContainerState = 'collapse';
			} else {
				this.chatBoxState = 'middle-expand';
				this.friendsContainerState = 'expand';
			}
		} else {
			this.chatBoxState = 'collapse';
			this.friendsContainerState = 'collapse';
		}
	}

	expandFriendsContainer() {
		if (this.chatBoxIsOpening && !this.mainContainerIsExpanding) {
			this.chatBoxState = 'expand';
			this.friendsContainerState = 'collapse';
		} else {
			this.chatBoxState = 'middle-expand';
			this.friendsContainerState = 'expand';
		}
		this.mainContainerIsExpanding = true;
	}

	expandChatBox() {
		this.chatBoxState = 'expand';
		this.friendsContainerState = 'collapse';
		this.chatBoxIsOpening = true;
		this.mainContainerIsExpanding = true;
	}

	protected initSearchFriendsPopup() {
		this.searchFriendsUIService.init(this.searchFriendBtnER);
	}

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends().subscribe(data => {
			this.friends = data;
		})
	}
}
