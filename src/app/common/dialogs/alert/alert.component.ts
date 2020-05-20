import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewContainerRef, Injector, ComponentRef } from "@angular/core";
import { CssConfigs } from 'src/environments/environment';

@Component({
	selector: "common-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.css"],
	styles: [`:host{z-index: ${CssConfigs.errorPopupZIndex} }`]
})
export class AlertComponent implements OnInit {
	private message: string = 'hello world';
	private data: any;
	private destroy: () => void;

	constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {
		this.data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
	}

	ngOnInit() {
		this.message = this.data.message;
	}
}
