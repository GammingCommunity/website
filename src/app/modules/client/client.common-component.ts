import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';

export class ClientCommonComponent {
	protected readonly translateService: TranslateService;
	protected readonly alertService: AlertService;

	constructor(injector: Injector) {
		this.translateService = injector.get(TranslateService);
		this.alertService = injector.get(AlertService);
	}
	
	protected hideClickedELement(event) {
		event.target.style.display = 'none';
	}
}
