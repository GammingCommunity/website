import { Component, OnInit } from "@angular/core";
import { LoginHttpService } from "./login.http.service";
import { LoggingResultStatus, LoggingResult } from "./login.dto";
import { AuthService } from "src/app/common/services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	private loginName: string;
	private password: string;

	constructor(
		private thisHttpService: LoginHttpService,
		private auth: AuthService
	) {}

	ngOnInit() {}

	log() {
		this.thisHttpService.login(
			this.loginName,
			this.password,
			(result: LoggingResult) => {
				switch (result.status) {
					case LoggingResultStatus.SUCCESS:
						this.auth.setSessionToken(result.token);
						this.redirectToGameChannelPage();
						break;

					case LoggingResultStatus.WRONG_PWD:
						alert("Sai mat khau");
						break;

					case LoggingResultStatus.WRONG_USERNAME:
						alert("Sai tai khoan");
						break;

					default:
						alert(result);
						break;
				}
			}
		);
	}

	redirectToGameChannelPage() {
		window.location.href = "/client/game-channel";
	}
}
