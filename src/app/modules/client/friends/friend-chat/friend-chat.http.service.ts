import { Injectable, Injector } from "@angular/core";
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class FriendChatHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}


}
