import { Injectable } from "@angular/core";
import { MyFriend } from '../friends.dto';

@Injectable({
	providedIn: "root"
})
export class FriendChatService {
	private showingChatBoxFunc: (selectedFriend: MyFriend) => void;
	
	constructor() { }

	setShowingChatBoxCallback(callback: (selectedFriend: MyFriend) => void){
		this.showingChatBoxFunc = callback;
	}

	callShowingChatBoxFunc(selectedFriend: MyFriend){
		this.showingChatBoxFunc(selectedFriend);
	}
}
