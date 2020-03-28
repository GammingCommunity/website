import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly sessionToken: String = localStorage.getItem("token");

	constructor(private router: Router) {}

	getSessionToken(): String | null {
		if (this.sessionToken) {
			return this.sessionToken;
		} else {
			this.router.navigateByUrl("/login");
			return null;
		}
	}

	setSessionToken(token: string){
		localStorage.setItem("token", token);
	}
}
