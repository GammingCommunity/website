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
		viewContainerRef: any = null,
		data: any = null,
		destroyIfOutFocus: boolean = false
	) {
		anchorElement.nativeElement.addEventListener('click', (event) => {
			this.putDialogComponentToComponent(
				dialogType,
				{
					anchorElement: anchorElement,
					viewContainerRef: viewContainerRef,
					destroyIfOutFocus: destroyIfOutFocus
				},
				data
			);
		});
	}

	putDialogComponentToComponent(
		dialogType: Type<any>,
		{
			anchorElement = null,
			viewContainerRef = null,
			destroyIfOutFocus = false
		},
		data = null,
	): ViewRef {
		const isMovingDialog: boolean = anchorElement && viewContainerRef;
		viewContainerRef = viewContainerRef ? viewContainerRef : this.viewContainerRef;

		const factory = this.factoryResolver.resolveComponentFactory(dialogType);
		const componentIndex = Date.now();
		const component = factory.create(Injector.create({
			providers: [
				{
					provide: 'destroy', useValue: () => component.destroy()
				},
				{
					provide: 'data', useValue: data
				}
			],
			parent: viewContainerRef.injector
		}));
		const viewRefResult: ViewRef = viewContainerRef.insert(component.hostView, componentIndex);

		if (destroyIfOutFocus) {
			if (anchorElement) {
				this.addOutFocusEventListener(component, componentIndex);
			} else {
				this.addOutFocusEventListener(component);
			}
		}

		//move dialog to anchorElement
		if (isMovingDialog) {
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

		const handler = event => {
			if (componentIndex && !this.dialogs[componentIndex].wasClicked) {
				this.dialogs[componentIndex].wasClicked = true;
			} else if (!dialogComponentRef.location.nativeElement.contains(event.target)) {
				window.removeEventListener('click', handler);
				dialogComponentRef.destroy();
			}
		};

		window.addEventListener('click', handler);
	}
}
