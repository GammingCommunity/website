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
		if (this.sessionToken) {
			return this.sessionToken;
		} else {
			this.router.navigateByUrl("/login");
			return null;
		}
	}

	setSessionToken(token: string) {
		localStorage.setItem("token", token);
	}
}
