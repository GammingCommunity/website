import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyFriend } from './friends.dto';
import { FriendsHttpService } from './friends.http.service';
import { Friend } from './friend-chat/friend-chat.dto';
import { FriendChatService } from './friend-chat/friend-chat.service';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.css'],
	animations: [
		trigger('changeMainContainerState', [
			state('expand', style({
				width: '300px'
			})),
			state('collapse', style({
				width: '60px'
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		]),
		trigger('changeContainerState', [
			state('expand', style({
				width: '100%'
			})),
			state('collapse', style({
				width: '60px'
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		])
	]
})
export class FriendsComponent implements OnInit {
	private mainContainerState: string = 'expand';
	private containerState: string = 'expand';
	private friends: MyFriend[] = [];

	constructor(private friendsHttpService: FriendsHttpService, private friendChatService: FriendChatService) { }

	ngOnInit() {
		this.fetchFriends();
	}

	openChatBox(selectedFriend: MyFriend) {
		this.friendChatService.callShowingChatBoxFunc(selectedFriend);
		this.collapseContainer();
	}

	resizeMainContainer(){
		if (this.mainContainerState === 'expand'){
			this.mainContainerState = 'collapse';
			this.containerState = 'collapse';
		} else {
			this.mainContainerState = 'expand';
		}
	}
	
	collapseContainer(){
		this.containerState = 'collapse';
	}
	
	expandContainer(){
		this.containerState = 'expand';
	}

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends().subscribe(data => {
			this.friends = data;
		})
	}
}
