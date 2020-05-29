import { Injectable, ComponentFactoryResolver, ViewContainerRef, ViewRef, Type } from "@angular/core";
import { LoaderComponent } from './loader.component';
import { DialogService } from '../dialog.service';
import { LocalLoader } from './loader.dto';

@Injectable({
	providedIn: "root"
})
export class LoaderService extends DialogService {
	private globalLoaderIds: any[] = [];
	private localLoaders: LocalLoader[] = [];
	private globalLoaderRef: ViewRef;

	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	start(id) {
		if (this.globalLoaderIds.length === 0) {
			this.globalLoaderRef = this.putDialogComponentToComponent(LoaderComponent, { destroyIfOutFocus: false });
		}

		this.globalLoaderIds.push(id);
	}

	end(id) {
		this.removeAnGlobalLoaderId(id);

		if (this.globalLoaderIds.length === 0 && this.globalLoaderRef) {
			this.globalLoaderRef.destroy();
		}
	}

	addLocalLoader(viewContainerRef: ViewContainerRef): LocalLoader {
		const id = Date.now();
		const loader = this.putDialogComponentToComponent(LoaderComponent, { viewContainerRef: viewContainerRef });
		const locolLoader = new LocalLoader(id, loader);
		this.localLoaders.push(locolLoader);
		return locolLoader;
	}

	destroyLocalLoader(id: number) {
		const localLoader = this.localLoaders.find(item => item.loaderId === id);
		if (localLoader) {
			localLoader.loaderVR.destroy();
			this.removeAnLocalLoader(localLoader);
		}
	}

	protected removeAnGlobalLoaderId(id) {
		const index = this.globalLoaderIds.indexOf(id);
		if (index > -1) {
			this.globalLoaderIds.splice(index, 1);
		}
	}

	protected removeAnLocalLoader(localLoader: LocalLoader) {
		const index = this.localLoaders.indexOf(localLoader);
		if (index > -1) {
			this.localLoaders.splice(index, 1);
		}
	}
}
