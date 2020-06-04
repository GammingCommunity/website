import { Component, OnInit, Injector, ViewContainerRef, ComponentRef, AfterViewInit, ElementRef } from '@angular/core';
import { CssConfigs } from 'src/environments/environment';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { FeedbackUIService } from '../feedback/feedback.ui.service';
import { MyProfile } from '../client.dto';
import { ClientCommonComponent } from '../client.common-component';
import { TranslateService } from '@ngx-translate/core';
import { ProfileDropdownLanguage } from './profile-dropdown.language';
import { LanguageService } from 'src/app/common/services/language.service';

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
export class ProfileDropdownComponent extends ClientCommonComponent {
	private destroy: () => void;

	constructor(
		protected injector: Injector,
		protected languageService: LanguageService,
		private feedbackUIService: FeedbackUIService,
	) {
		super(injector);
		ProfileDropdownLanguage.define(this.translateService);
		this.destroy = injector.get('destroy');
	}
	
	showFeedback() {
		this.feedbackUIService.show(this.currentAccountId);
	}
	
	changeLanguage() {
		if (this.translateService.getDefaultLang() === 'vi'){
			this.translateService.setDefaultLang('en');
		} else {
			this.translateService.setDefaultLang('vi');
		}
		this.languageService.setCurrentLang(this.translateService.getDefaultLang());
	}

	logOut() {
		this.authService.removeSessionToken();
		window.location.href = "/client";
	}
}
