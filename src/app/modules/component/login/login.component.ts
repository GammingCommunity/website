import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { LoginHttpService } from "./login.http.service";
import { LoggingResultStatus, LoggingResult } from "./login.dto";
import { AuthService } from "src/app/common/services/auth.service";
import { Router } from '@angular/router';

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements AfterViewInit {
	@ViewChild('focusing', { static: true }) focusingElementRef: ElementRef;

	private loginName: string;
	private password: string;

	constructor(
		private thisHttpService: LoginHttpService,
		private router: Router,
		private auth: AuthService
	) { }

	ngAfterViewInit() {
		this.focusingElementRef.nativeElement.focus();
	}

	log() {
		this.thisHttpService.login(this.loginName, this.password).subscribe((result: LoggingResult) => {
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
					console.log(result);
					break;
			}
		});
	}

	redirectToGameChannelPage() {
		window.location.href = "/";
	}
}
