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

@Injectable({
	providedIn: "root"
})
export class ClientDataService extends ClientCommonService {
	private currentGameChannel: GameChannel;

	constructor(
		protected injector: Injector,
		protected translateService: TranslateService,
		protected alertService: AlertService,
		protected router: Router,
	) {
		super(injector);
	}

	setCurrentGameChannel(game: GameChannel) {
		this.currentGameChannel = game;
	}

	getCurrentGameChannel(homeUrl: string): GameChannel {
		if (this.currentGameChannel) {
			return this.currentGameChannel;
		} else {
			this.translateService.get('ClientLanguage.YOU_HAVENT_CHOOSED_ANY_GAMES').subscribe(message => {
				this.alertService.show(message);
			});
			this.router.navigateByUrl(homeUrl);
			return new GameChannel();
		}
	}
}
