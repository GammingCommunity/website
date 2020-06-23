import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { MyProfile } from "./client.dto";
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientCommonService } from './client.common-service';
import { GameChannel } from './home/home.dto';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router } from '@angular/router';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';

@Injectable({
	providedIn: "root"
})
export class ClientDataService extends ClientCommonService {
	private currentGameChannelIdTitle: string = 'currentGameChannelId';
	private currentGameChannelId: string;
	private reloadGameRoomsHandler: () => void = null;
	private reloadJoinedRoomsHandler: () => void = null;
	private reloadFriendsHandler: () => void = null;

	constructor(
		protected injector: Injector,
		protected translateService: TranslateService,
		protected alertService: AlertService,
		protected router: Router,
	) {
		super(injector);
	}

	//reloadGameRoomsHandler
	reloadGameRooms(){
		if(this.reloadGameRoomsHandler === null){
			this.alertService.show('reloadGameRoomsHandler === null');
		} else {
			this.reloadGameRoomsHandler();
		}
	}

	setReloadGameRoomsHandler(func: () => void){
		this.reloadGameRoomsHandler = func;
	}
	//reloadJoinedRoomsHandler
	reloadJoinedRooms(){
		if(this.reloadJoinedRoomsHandler === null){
			this.alertService.show('reloadJoinedRoomsHandler === null');
		} else {
			this.reloadJoinedRoomsHandler();
		}
	}

	setReloadJoinedRoomsHandler(func: () => void){
		this.reloadJoinedRoomsHandler = func;
	}
	//reloadFriendsHandler
	reloadFriends(){
		if(this.reloadFriendsHandler === null){
			this.alertService.show('reloadFriendsHandler === null');
		} else {
			this.reloadFriendsHandler();
		}
	}

	setReloadFriendsHandler(func: () => void){
		this.reloadFriendsHandler = func;
	}
	//
	setCurrentGameChannelId(id: string) {
		this.currentGameChannelId = id;
		localStorage.setItem(this.currentGameChannelIdTitle, id);
	}

	getCurrentGameChannelId(homeUrl: string): string {
		if (this.currentGameChannelId) {
			return this.currentGameChannelId;
		} else {
			//check in localstore
			const id = localStorage.getItem(this.currentGameChannelIdTitle);
			if(id && id !== 'undefined'){
				this.currentGameChannelId = id;
				return this.currentGameChannelId;
			} else {
				SwtAlert.display({ title: this.translateService.instant('ClientLanguage.YOU_HAVENT_CHOOSED_ANY_GAMES'), icon: 'info' });
				this.router.navigateByUrl(homeUrl);
				return null;
			}
		}
	}
}
