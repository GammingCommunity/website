import { Injectable } from "@angular/core";
import { GraphqlService } from "src/app/common/services/graphql.service";
import { ServiceUrls } from "src/environments/environment";
import { LoggingResultStatus } from "./login.dto";
import { AuthService } from "src/app/common/services/auth.service";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class LoginHttpService {
	readonly amsUrl: string = ServiceUrls.amSerive;

	constructor(
		private graphql: GraphqlService,
		private auth: AuthService,
		private router: Router
	) {}

	login(name: String, pass: String, failedCallback) {
		this.graphql
			.query(
				this.amsUrl,
				`login(username: "${name}", pwd: "${pass}"){token, status}`
			)
			.subscribe(response => {
				if (
					response &&
					response.data &&
					response.data.login &&
					response.data.login.status &&
					response.data.login.status ===
						LoggingResultStatus.SUCCESS &&
					response.data.login.token
				) {
					this.auth.setSessionToken(response.data.login.token);
					this.redirectToGameChannelPage();
				} else {
					if (
						response &&
						response.data &&
						response.data.login &&
						response.data.login.status
					) {
						failedCallback(response.data.login.status);
					} else {
						alert(response);
					}
				}
			});
	}

	redirectToGameChannelPage(){
		window.location.href = "/game-channel";
	}
}
