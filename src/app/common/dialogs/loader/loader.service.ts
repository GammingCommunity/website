import { Injectable, ComponentFactoryResolver, ViewContainerRef, ViewRef } from "@angular/core";
import { LoaderComponent } from './loader.component';

@Injectable({
	providedIn: "root"
})
export class LoaderService {
	private viewContainerRef: ViewContainerRef;
	private loaderNumber: number = 0;
	private loaderId: number;

	constructor(private factoryResolver: ComponentFactoryResolver) { }

	setViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
	}

	start() {
		if (this.loaderNumber === 0) {
			this.putLoaderComponentToComponent();
		}

		this.loaderNumber++;
	}

	end() {
		this.loaderNumber--;

		if (this.loaderNumber === 0) {
			this.viewContainerRef.remove(this.loaderId);
		}
	}

	protected setLoaderId(viewContainerRef: ViewContainerRef, viewRef: ViewRef) {
		this.loaderId = viewContainerRef.indexOf(viewRef);
	}

	protected putLoaderComponentToComponent() {
		const factory = this.factoryResolver.resolveComponentFactory(LoaderComponent);
		const component = factory.create(this.viewContainerRef.parentInjector);
		const viewRef = this.viewContainerRef.insert(component.hostView);
		this.setLoaderId(this.viewContainerRef, viewRef);
	}
}
