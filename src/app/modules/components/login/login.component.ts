import { Component, OnInit } from "@angular/core";
import { LoginHttpService } from "./login.http.service";
import { LoggingResultStatus } from "./login.dto";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	loginName: String;
	password: String;

	constructor(private thisHttpService: LoginHttpService) {}

	ngOnInit() {}

	log() {
		this.thisHttpService.login(
			this.loginName,
			this.password,
			(status: LoggingResultStatus) => {
				switch (status) {
					case LoggingResultStatus.WRONG_PWD:
						alert("Sai mat khau");
						break;

					case LoggingResultStatus.WRONG_USERNAME:
						alert("Sai tai khoan");
						break;

					default:
						alert(status);
						break;
				}
			}
		);
	}
}
