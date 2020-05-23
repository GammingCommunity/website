import { Component, OnInit, Injector, ViewContainerRef, ComponentRef, AfterViewInit, ElementRef } from '@angular/core';
import { CssConfigs } from 'src/environments/environment';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { FeedbackUIService } from '../feedback/feedback.ui.service';
import { MyProfile } from '../client.dto';

@Component({
	selector: 'app-profile-dropdown',
	templateUrl: './profile-dropdown.component.html',
	styleUrls: ['./profile-dropdown.component.css'],
	styles: [`:host{z-index: ${CssConfigs.dropdownMenuZIndex} }`],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('100ms ease', style({ opacity: 1 }))
			])
		])
	]
})
export class ProfileDropdownComponent {
	private destroy: () => void;
	private currentAccount: MyProfile;

	constructor(
		private injector: Injector,
		private router: Router,
		private feedbackUIService: FeedbackUIService,
		private authService: AuthService
	) {
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.currentAccount = data.currentAccount;
	}

	showFeedback() {
		this.feedbackUIService.show(this.currentAccount.id);
	}

	logOut() {
		this.authService.removeSessionToken();
		window.location.href = "/client";
	}
}
