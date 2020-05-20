import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyFriend } from './friends.dto';
import { FriendsHttpService } from './friends.http.service';
import { Friend } from './friend-chat/friend-chat.dto';
import { FriendChatService } from './friend-chat/friend-chat.service';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
	@ViewChild('mainContainer', { static: true }) mainContainerElementRef: ElementRef;
	@ViewChild('container', { static: true }) containerElementRef: ElementRef;
	private containerIsExpand: boolean = true;
	private friends: MyFriend[] = [];

	constructor(private friendsHttpService: FriendsHttpService, private friendChatService: FriendChatService) { }

	ngOnInit() {
		this.fetchFriends();
	}

	openChatBox(selectedFriend: MyFriend) {
		this.friendChatService.callShowingChatBoxFunc(selectedFriend);
		this.collapseContainer();
	}

	resizeMaicontainer(){
		if (this.containerIsExpand){
			this.mainContainerElementRef.nativeElement.style.width = '10px';
		}else {
			this.mainContainerElementRef.nativeElement.style.width = '300px';
		}
		this.containerIsExpand = !this.containerIsExpand;
	}
	
	collapseContainer(){
		this.containerElementRef.nativeElement.style.width = '60px';
	}
	
	expandContainer(){
		this.containerElementRef.nativeElement.style.width = '100%';
	}

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends().subscribe(data => {
			this.friends = data;
		})
	}
}
