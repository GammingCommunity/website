import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { MyProfile } from "./client.dto";
import { ClientHttpService } from "./client.http.service";
import { Router } from '@angular/router';

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
	private profile: MyProfile;
	private redirectLink: string;
	private readonly baseUrl: string = 'client/';  

	constructor(
		private clientHttpService: ClientHttpService,
		private router: Router
	) {
		this.redirectTo('game-channel');
	}

	ngOnInit() {
		this.fetchProfile();
	}

	redirectTo(link: string) {
		this.router.navigate([this.baseUrl + link]);
		this.redirectLink = link;
	}

	protected fetchProfile() {
		this.clientHttpService.fetchProfile().subscribe(data => {
			this.profile = data;
		});
	}
}
