import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, ElementRef, ViewRef } from "@angular/core";
import { DialogService } from 'src/app/common/dialogs/dialog.service';
import { FeedbackComponent } from './feedback.component';

@Injectable({
	providedIn: "root"
})
export class FeedbackUIService extends DialogService {
	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	show(accountId: number) {
		return super.putDialogComponentToComponent(
			FeedbackComponent,
			{ accountId: accountId },
			{ outFocus: false }
		);
	}
}
