import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector } from "@angular/core";
import { AlertComponent } from './alert.component';

@Injectable({
	providedIn: "root"
})
export class AlertService {
	private viewContainerRef: ViewContainerRef;

	constructor(private factoryResolver: ComponentFactoryResolver, private injector: Injector) { }

	setViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
	}

	show(message: string) {
		this.putAlertComponentToComponent(message);
	}

	protected putAlertComponentToComponent(message: string) {
		const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
		const injector = Injector.create([
			{
				provide: 'destroy', useValue: () => this.viewContainerRef.remove(this.viewContainerRef.indexOf(component.hostView))
			},
			{
				provide: 'message', useValue: message
			}
		]);
		const component = factory.create(injector);
		this.viewContainerRef.insert(component.hostView);

	}
}
