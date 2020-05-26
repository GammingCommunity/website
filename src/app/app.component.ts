import { Component, ViewContainerRef } from "@angular/core";
import { LoaderService } from './common/dialogs/loader/loader.service';
import { AlertService } from './common/dialogs/alert/alert.service';
import { DialogService } from './common/dialogs/dialog.service';
import { SearchFriendsUIService } from './modules/client/friends/search-friends/search-friends.ui.service';

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
