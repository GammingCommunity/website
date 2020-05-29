import { Component, OnInit, Input, Injector } from '@angular/core';
import { FriendChatHttpService } from './friend-chat.http.service';
import { FriendChatUIService } from './friend-chat.ui.service';
import { Friend } from './friend-chat.dto';
import { MyFriend } from '../friends.dto';
import { TranslateService } from '@ngx-translate/core';
import { FriendChatLanguage } from './friend-chat.language';
import { ClientCommonComponent } from '../../client.common-component';

@Component({
	selector: 'app-friend-chat',
	templateUrl: './friend-chat.component.html',
	styleUrls: ['./friend-chat.component.css']
})
export class FriendChatComponent extends ClientCommonComponent implements OnInit {
	private chatFriend: Friend;

	constructor(
		protected injector: Injector,
		private friendHttpService: FriendChatHttpService,
		private friendChatUIService: FriendChatUIService
	) {
		super(injector);
		this.friendChatUIService.showChatBoxFunc = (friend: MyFriend) => {
			this.chatFriend = friend;
		};
		FriendChatLanguage.define(this.translateService);
	}

	ngOnInit() {
	}
}
