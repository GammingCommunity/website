import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector } from "@angular/core";
import { AlertComponent } from './alert.component';
import { DialogService } from '../dialog.service';

@Injectable({
	providedIn: "root"
})
export class AlertService extends DialogService {
	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	show(message: string) {
		super.putDialogComponentToComponent(AlertComponent, { }, { message: message });
	}
}
