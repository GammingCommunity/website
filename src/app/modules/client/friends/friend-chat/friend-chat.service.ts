import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Friend } from './friend-chat.dto';

@Injectable({
	providedIn: "root"
})
export class FriendChatService {
	private chatToCallback: (id: number) => void;
	
	constructor() { }

	setChatToCallback(callback: (id: number) => void){
		this.chatToCallback = callback;
	}

	callChatTo(id: number){
		this.chatToCallback(id);
	}
}
