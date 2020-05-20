import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, ElementRef, ViewRef } from "@angular/core";
import { DialogService } from 'src/app/common/dialogs/dialog.service';
import { ProfileDropdownComponent } from './profile-dropdown.component';

@Injectable({
	providedIn: "root"
})
export class ProfileDropdownUIService extends DialogService {
	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	init(viewContainerRef: ViewContainerRef, anchorElement: ElementRef) {
		return super.addDialogComponentToComponentPuttingEvent(
			ProfileDropdownComponent,
			anchorElement,
			viewContainerRef
		);
	}
}
