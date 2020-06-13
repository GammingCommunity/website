import { ViewRef, ViewContainerRef } from '@angular/core';

export class LocalLoader {
	loaderId: number;
	loaderVR: ViewRef;

	constructor(loaderId: number, loader: ViewRef) {
		this.loaderId = loaderId;
		this.loaderVR = loader;
	}
}

export class LoaderOptions {
	isUseGlobalLoader: boolean = true;

	constructor(options = null) {
		if (options) {
			if (typeof options.isUseGlobalLoader === 'boolean') {
				this.isUseGlobalLoader = options.isUseGlobalLoader;
			}
		}
	}
}