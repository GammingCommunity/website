import { Component, OnInit } from '@angular/core';
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
	private friends: MyFriend[] = [];
	private chatToFunc: (callback: (id: number) => void) => void;
	private selectedFriendId: number;

	constructor(private friendsHttpService: FriendsHttpService, private friendChatService: FriendChatService) {
		this.chatToFunc = (callback) => {
			callback(this.selectedFriendId);
		}
	}

	ngOnInit() {
		this.fetchFriends();
	}

	openChatTo(id: number) {
		this.friendChatService.callChatTo(id);
	}

	protected fetchFriends() {
		this.friendsHttpService.fetchFriends().subscribe(data => {
			this.friends = data;
		})
	}
}
