import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { MyFriend } from './friends.dto';
import { FriendsHttpService } from './friends.http.service';
import { FriendChatUIService } from './friend-chat/friend-chat.ui.service';
import { trigger, state, transition, animate, style, query, stagger } from '@angular/animations';
import { ClientCommonComponent } from '../client.common-component';
import { FriendsLanguage } from './friends.language';
import { pipe } from 'rxjs';
import { SearchFriendsComponent } from './search-friends/search-friends.component';
import { FriendItemDropdownComponent } from './friend-item-dropdown/friend-item-dropdown.component';
import { CssConfigs } from 'src/environments/environment';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.css'],
	animations: [
		trigger('changeFriendsContainerState', [
			state('expand', style({
				padding: '15px',
				width: '350px'
			})),
			state('collapse', style({
				width: '74px',
				padding: '5px',
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		]),
		trigger('changeChatBoxState', [
			state('expand', style({
				width: '402px'
			})),
			state('middle-expand', style({
				width: '276px'
			})),
			state('collapse', style({
				width: '0px'
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		]),
		trigger('listAnimation', [
			transition('* => *', [
				query(':leave', [
					stagger(50, [
						animate('500ms ease', style({
							opacity: 0,
							transform: "translateX(100%)"
						}))
					])
				], { optional: true }),
				query(':enter', [
					style({
						opacity: 0,
						transform: "translateX(100%)"
					}),
					stagger(50, [
						animate('500ms ease', style({
							opacity: 1,
							transform: "translateX(0%)"
						}))
					])
				], { optional: true })
			])
		])
	],
})
export class FriendsComponent extends ClientCommonComponent implements OnInit {
	mainContainerIsExpanding: boolean = true;
	chatBoxIsOpening: boolean = false;
	friendsContainerState: string = 'expand';
	chatBoxState: string = 'middle-expand';
	friends: MyFriend[] = [];
	selectedFriend: MyFriend;

	constructor(
		protected injector: Injector,
		private friendsHttpService: FriendsHttpService,
		private friendChatUIService: FriendChatUIService
	) {
		super(injector);
		FriendsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchFriends();
	}

	openChatBox(selectedFriend: MyFriend) {
		this.selectedFriend = selectedFriend;
		this.friendChatUIService.showChatBoxFunc(selectedFriend);
		this.expandChatBox();
	}

	showFriendItemDropdown(event, accountId: number) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: FriendItemDropdownComponent,
			anchorElement: event.target,
			anchorTo: "right",
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions:{
				classList: 'py-3 px-2 bg6',
				width: 280,
				useExitBtn: false
			},
			data: {
				accountId: accountId
			}
		});
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

	showSearchPopup() {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: SearchFriendsComponent,
			useBackground: true,
			destroyIfOutFocus: true,
			zIndex: CssConfigs.popupZIndex,
			popupOptions: {
				
			}
		});
	}

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends()
			.pipe()
			.subscribe(data => {
				this.friends = data;
			})
	}
}
