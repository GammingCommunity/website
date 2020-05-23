import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly sessionToken: string = localStorage.getItem("token");
	private readonly tokenTitle: string = 'token';

	constructor(private router: Router) { }

	getTokenTitle(): string {
		return this.tokenTitle;
	}

	getSessionToken(): string | null {
		if (this.sessionToken && this.sessionToken != '') {
			return this.sessionToken;
		} else {
			window.location.href = "/login";
			return null;
		}
	}

	setSessionToken(token: string) {
		localStorage.setItem(this.tokenTitle, token);
	}

	removeSessionToken() {
		localStorage.removeItem(this.tokenTitle);
	}
}
