import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, AfterViewChecked, Injector } from "@angular/core";
import { MyProfile } from "./client.dto";
import { ClientHttpService } from "./client.http.service";
import { Router } from '@angular/router';
import { ProfileDropdownUIService } from './profile-dropdown/profile-dropdown.ui.service';
import { FeedbackUIService } from './feedback/feedback.ui.service';
import { SearchFriendsUIService } from './friends/search-friends/search-friends.ui.service';
import { TranslateService } from '@ngx-translate/core';
import { ClientLanguage } from './client.language';
import { ClientCommonComponent } from './client.common-component';
import { SearchFriendLanguage } from './friends/search-friends/search-friend.language';

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent extends ClientCommonComponent implements OnInit, AfterViewInit {
	@ViewChild('profileDropdown', { static: true }) profileDropdownER: ElementRef;
	@ViewChild('profileDropdown', { static: true, read: ViewContainerRef }) profileDropdownVR: ViewContainerRef;
	private profile: MyProfile;
	private redirectLink: string;
	private readonly baseUrl: string = '/client';

	constructor(
		protected injector: Injector,
		private clientHttpService: ClientHttpService,
		private router: Router,
		private feedbackUIService: FeedbackUIService,
		private viewContainerRef: ViewContainerRef,
		private profileDropdownUIService: ProfileDropdownUIService,
		private searchFriendsUIService: SearchFriendsUIService
	) {
		super(injector);
		this.feedbackUIService.setViewContainerRef(this.viewContainerRef);
		this.searchFriendsUIService.setViewContainerRef(this.viewContainerRef);
		ClientLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchProfile();
	}

	ngAfterViewInit() {
		this.initProfileDropdown(this.profile);
	}

	redirectTo(link: string) {
		this.router.navigateByUrl(`${this.baseUrl}/${link}`);
		this.redirectLink = link;
	}

	protected fetchProfile() {
		this.clientHttpService.fetchProfile().subscribe(data => {
			this.profile = data;
		});
	}

	protected initProfileDropdown(profile: MyProfile) {
		this.profileDropdownUIService.init(this.profileDropdownVR, this.profileDropdownER, profile);
	}
}
