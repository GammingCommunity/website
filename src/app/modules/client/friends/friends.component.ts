import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyFriend } from './friends.dto';
import { FriendsHttpService } from './friends.http.service';
import { FriendChatService } from './friend-chat/friend-chat.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.css'],
	animations: [
		trigger('changeFriendsContainerState', [
			state('expand', style({
				width: '300px'
			})),
			state('collapse', style({
				width: '60px'
			})),
			transition('*=>expand', animate('140ms ease')),
			transition('*=>collapse', animate('140ms ease'))
		]),
		trigger('changeChatBoxState', [
			state('expand', style({
				width: '360px'
			})),
			state('middle-expand', style({
				width: '240px'
			})),
			state('collapse', style({
				width: '0',
				marginRight: '0',
			})),
			transition('*=>expand', animate('140ms ease')),
			transition('*=>collapse', animate('140ms ease'))
		])
	]
})
export class FriendsComponent implements OnInit {
	private mainContainerIsExpanding: boolean = true;
	private chatBoxIsOpening: boolean = false;
	private friendsContainerState: string = 'expand';
	private chatBoxState: string = 'middle-expand';
	private friends: MyFriend[] = [];

	constructor(private friendsHttpService: FriendsHttpService, private friendChatService: FriendChatService) { }

	ngOnInit() {
		this.fetchFriends();
	}

	openChatBox(selectedFriend: MyFriend) {
		this.friendChatService.callShowingChatBoxFunc(selectedFriend);
		this.expandChatBox();
	}

	resizeMainContainer() {
		this.mainContainerIsExpanding = !this.mainContainerIsExpanding;

		if (this.mainContainerIsExpanding) {
			if (this.chatBoxIsOpening){
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
		if (this.chatBoxIsOpening && !this.mainContainerIsExpanding){
			this.chatBoxState = 'expand';
			this.friendsContainerState = 'collapse';
		}else {
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

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends().subscribe(data => {
			this.friends = data;
		})
	}
}
