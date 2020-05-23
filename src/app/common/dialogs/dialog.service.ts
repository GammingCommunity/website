import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, HostListener, ElementRef, Type, ViewRef, ComponentRef } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class DialogService {
	protected viewContainerRef: ViewContainerRef;
	protected dialogs: any[] = [];

	constructor(protected factoryResolver: ComponentFactoryResolver) { }

	setViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
	}

	addDialogComponentToComponentPuttingEvent(
		dialogType: Type<any>,
		anchorElement: ElementRef,
		viewContainerRef: ViewContainerRef,
		data: any = null,
		outFocus: boolean = true
	) {
		anchorElement.nativeElement.addEventListener('click', (event) => {
			this.putDialogComponentToComponent(dialogType, data, {
				anchorElement: anchorElement,
				viewContainerRef: viewContainerRef,
				outFocus: outFocus
			});
		});
	}

	putDialogComponentToComponent(
		dialogType: Type<any>,
		data: any = null,
		{
			anchorElement = null,
			viewContainerRef = null,
			outFocus = true
		},
	): ViewRef {
		viewContainerRef = viewContainerRef ? viewContainerRef : this.viewContainerRef;

		const factory = this.factoryResolver.resolveComponentFactory(dialogType);
		const componentIndex = Date.now();
		const component = factory.create(Injector.create([
			{
				provide: 'destroy', useValue: () => viewContainerRef.remove(componentIndex)
			},
			{
				provide: 'data', useValue: data
			}
		]));
		const viewRefResult: ViewRef = viewContainerRef.insert(component.hostView, componentIndex);

		if (outFocus) {
			if (anchorElement) {
				this.addOutFocusEventListener(component, componentIndex);
			} else {
				this.addOutFocusEventListener(component);
			}
		}

		if (anchorElement) {
			const bonus = 1;
			const y = anchorElement.nativeElement.offsetTop + anchorElement.nativeElement.offsetHeight + bonus;
			const x = anchorElement.nativeElement.offsetLeft + bonus;
			component.location.nativeElement.style.top = y + 'px';
			component.location.nativeElement.style.left = x + 'px';
			component.location.nativeElement.style.position = 'absolute';
		}

		return viewRefResult;
	}

	protected addOutFocusEventListener(dialogComponentRef: ComponentRef<any>, componentIndex: number = null) {
		if (componentIndex) {
			this.dialogs[componentIndex] = { wasClicked: false };
		}

		window.addEventListener('click', (event) => {
			if (componentIndex && !this.dialogs[componentIndex].wasClicked) {
				this.dialogs[componentIndex].wasClicked = true;
			} else if (!dialogComponentRef.location.nativeElement.contains(event.target)) {
				dialogComponentRef.destroy();
			}
		});
	}
}
