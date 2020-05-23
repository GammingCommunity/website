import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, AfterViewChecked } from "@angular/core";
import { MyProfile } from "./client.dto";
import { ClientHttpService } from "./client.http.service";
import { Router } from '@angular/router';
import { ProfileDropdownUIService } from './profile-dropdown/profile-dropdown.ui.service';
import { FeedbackUIService } from './feedback/feedback.ui.service';

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
	@ViewChild('profileDropdown', { static: true }) profileDropdownER: ElementRef;
	@ViewChild('profileDropdown', { static: true, read: ViewContainerRef }) profileDropdownVR: ViewContainerRef;
	private profile: MyProfile;
	private redirectLink: string;
	private readonly baseUrl: string = '/client';

	constructor(
		private clientHttpService: ClientHttpService,
		private router: Router,
		private feedbackUIService: FeedbackUIService,
		private viewContainerRef: ViewContainerRef,
		private profileDropdownUIService: ProfileDropdownUIService
	) {
		this.feedbackUIService.setViewContainerRef(this.viewContainerRef);
	}

	ngOnInit() {
		this.fetchProfile();
	}

	redirectTo(link: string) {
		this.router.navigateByUrl(`${this.baseUrl}/${link}`);
		this.redirectLink = link;
	}

	protected fetchProfile() {
		this.clientHttpService.fetchProfile().subscribe(data => {
			this.profile = data;
			this.initProfileDropdown(data);
		});
	}

	protected initProfileDropdown(profile: MyProfile) {
		this.profileDropdownUIService.init(this.profileDropdownVR, this.profileDropdownER, profile);
	}
}
