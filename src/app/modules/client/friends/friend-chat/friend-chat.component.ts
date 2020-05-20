import { Component, OnInit, Input } from '@angular/core';
import { FriendChatHttpService } from './friend-chat.http.service';
import { FriendChatService } from './friend-chat.service';
import { Friend } from './friend-chat.dto';
import { MyFriend } from '../friends.dto';

@Component({
	selector: 'app-friend-chat',
	templateUrl: './friend-chat.component.html',
	styleUrls: ['./friend-chat.component.css']
})
export class FriendChatComponent implements OnInit {
	private chatFriend: Friend;

	constructor(private friendHttpService: FriendChatHttpService, private friendChatService: FriendChatService) {
		this.friendChatService.setShowingChatBoxCallback((friend: MyFriend) => {
			this.chatFriend = friend;
		});
	}

	ngOnInit() {
	}
}
