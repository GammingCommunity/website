import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewContainerRef, Injector, ComponentRef } from "@angular/core";
import { CssConfigs } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: "common-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.css"],
	styles: [`:host{z-index: ${CssConfigs.errorPopupZIndex} }`],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({
					height: '0px'
				}),
				animate('400ms ease', style({
					height: '200px'
				}))
			])
		])
	],
})
export class AlertComponent {
	private message: string = 'hello world';
	private buttonName: string;
	private callback: () => void;
	private destroy: () => void;

	constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.callback = data.callback;
		this.buttonName = data.buttonName;
		this.message = data.message;
	}
}
