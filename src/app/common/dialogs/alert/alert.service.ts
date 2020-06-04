import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector } from "@angular/core";
import { AlertComponent } from './alert.component';
import { DialogService } from '../dialog.service';

@Injectable({
	providedIn: "root"
})
export class AlertService extends DialogService {
	private

	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	show(message: string, buttonName: string = 'OK', callback: () => void = () => {}) {
		super.putDialogComponentToComponent(AlertComponent, {}, {
			message: message,
			buttonName: buttonName,
			callback: callback
		});
	}
}
