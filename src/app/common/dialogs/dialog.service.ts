import {
	Injectable,
	ComponentRef,
	ComponentFactoryResolver,
	Type,
	ViewContainerRef,
	ElementRef
} from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class DialogService {
	// constructor(private elementRef: ElementRef) {}

	// renderDialog(componentType: Type<any>): ComponentRef<any> {
	// 	const dialogContainerRef = this.elementRef.nativeElement.querySelector(
	// 		"dialog"
	// 	).ViewContainerRef;
	// 	const injector = dialogContainerRef.injector;

	// 	const cfr: ComponentFactoryResolver = injector.get(
	// 		ComponentFactoryResolver
	// 	);

	// 	const componentFactory = cfr.resolveComponentFactory(componentType);

	// 	return dialogContainerRef.createComponent(
	// 		componentFactory,
	// 		0,
	// 		injector
	// 	);
	// }
}
