import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, ElementRef, ViewRef } from "@angular/core";
import { DialogService } from 'src/app/common/dialogs/dialog.service';
import { SearchFriendsComponent } from './search-friends.component';

@Injectable({
	providedIn: "root"
})
export class SearchFriendsUIService extends DialogService {
	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	init(anchorElement: ElementRef) {
		return super.addDialogComponentToComponentPuttingEvent(
			SearchFriendsComponent,
			anchorElement
		);
	}
}
