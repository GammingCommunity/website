import { Component, ViewContainerRef } from "@angular/core";
import { LoaderService } from './common/dialogs/loader/loader.service';
import { AlertService } from './common/dialogs/alert/alert.service';
import { DialogService } from './common/dialogs/popup/popup.service';

@Component({
	selector: "app-root",
	template: "<router-outlet></router-outlet>"
})
export class AppComponent {
	constructor(
		private alertService: AlertService,
		private dialogService: DialogService,
		private loaderService: LoaderService,
		private viewContainerRef: ViewContainerRef
	) {
		this.alertService.setViewContainerRef(this.viewContainerRef);
		this.loaderService.setViewContainerRef(this.viewContainerRef);
		this.dialogService.setViewContainerRef(this.viewContainerRef);
	}
}
