import { TranslateService } from '@ngx-translate/core';
import { Injector, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router } from '@angular/router';
import { MyProfile } from './client.dto';
import { AuthService } from 'src/app/common/services/auth.service';

export class ClientCommonComponent {
	protected readonly translateService: TranslateService;
	protected readonly alertService: AlertService;
	protected readonly authService: AuthService;
	protected readonly baseUrl: string = '/client';
	protected readonly router: Router;
	protected readonly currentAccountId: number;
	protected readonly defaultAvatarUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/57882dae-888d-4c43-9dc5-924ae05b332c.png';
	protected readonly defaultCoverUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/cover/9df0a69a-209d-468f-8171-51c8417eabe0.png';
	
	protected outFocusHandler: (event) => void;

	constructor(injector: Injector) {
		this.translateService = injector.get(TranslateService);
		this.alertService = injector.get(AlertService);
		this.router = injector.get(Router);
		this.authService = injector.get(AuthService);
		this.currentAccountId = this.authService.getAccountId();
	}

	protected hideClickedELement(event) {
		event.target.style.display = 'none';
	}

	protected addOutFocusListener(viewContainerRef: ViewContainerRef, containerElementRef: ElementRef, outFocusHandler: (event) => void) {
		this.outFocusHandler = event => {
			if (!containerElementRef.nativeElement.contains(event.target)) {
				if (outFocusHandler) {
					outFocusHandler(event);
				}
			}
		}
		viewContainerRef.element.nativeElement.addEventListener('mousedown', this.outFocusHandler);
	}

	protected removeOutFocusListenr(viewContainerRef: ViewContainerRef) {
		if (this.outFocusHandler) {
			viewContainerRef.element.nativeElement.removeEventListener('mousedown', this.outFocusHandler);
		}
	}
}
