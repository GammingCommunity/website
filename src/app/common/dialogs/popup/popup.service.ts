import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, HostListener, ElementRef, Type, ViewRef, ComponentRef } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class DialogService {
	private viewContainerRef: ViewContainerRef;

	constructor(private factoryResolver: ComponentFactoryResolver) { }

	setViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
	}

	putDialogComponentToComponent(dialogType: Type<any>, data: any = null) {
		let component = null;
		const factory = this.factoryResolver.resolveComponentFactory(dialogType);
		const injector = Injector.create([
			{
				provide: 'destroy', useValue: component.hostView.destroy
			},
			{
				provide: 'data', useValue: data
			}
		]);
		component = factory.create(injector);
		this.viewContainerRef.insert(component.hostView);
		this.addOutFocusEventListener(component);
	}

	protected addOutFocusEventListener(dialogComponentRef: ComponentRef<any>) {
		window.addEventListener('click', (event) => {
			if (!dialogComponentRef.location.nativeElement.contains(event.target)) {
				dialogComponentRef.destroy();
			}
		});
	}
}
