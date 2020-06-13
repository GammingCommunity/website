import { TranslateService } from '@ngx-translate/core';
import { Injector, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyProfile } from './client.dto';
import { AuthService } from 'src/app/common/services/auth.service';
import { DialogService } from 'src/app/common/dialogs/dialog.service';

export class ClientCommonComponent {
	protected readonly translateService: TranslateService;
	protected readonly alertService: AlertService;
	protected readonly dialogService: DialogService;
	protected readonly authService: AuthService;
	protected readonly router: Router;
	protected readonly route: ActivatedRoute;
	protected readonly currentAccountId: number;
	private readonly lookAccountUrl: string = '/look';
	private readonly settingsUrl: string = '/settings';
	private readonly profileUrl: string = '/profile';
	protected readonly defaultAvatarUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/57882dae-888d-4c43-9dc5-924ae05b332c.png';
	protected readonly defaultCoverUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/cover/9df0a69a-209d-468f-8171-51c8417eabe0.png';

	constructor(injector: Injector) {
		this
		this.translateService = injector.get(TranslateService);
		this.alertService = injector.get(AlertService);
		this.route = injector.get(ActivatedRoute);
		this.router = injector.get(Router);
		this.authService = injector.get(AuthService);
		this.dialogService = injector.get(DialogService);
		this.currentAccountId = this.authService.getAccountId();
	}

	protected hideClickedELement(event) {
		event.target.style.display = 'none';
	}
}
