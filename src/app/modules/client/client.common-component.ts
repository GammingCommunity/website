import { TranslateService } from '@ngx-translate/core';
import { Injector, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router } from '@angular/router';

export class ClientCommonComponent {
	protected readonly translateService: TranslateService;
	protected readonly alertService: AlertService;
	protected readonly baseUrl: string = '/client';
	protected readonly router: Router;

	protected outFocusHandler: (event) => void;

	constructor(injector: Injector) {
		this.translateService = injector.get(TranslateService);
		this.alertService = injector.get(AlertService);
		this.router = injector.get(Router);
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
