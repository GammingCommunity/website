import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewContainerRef, Injector } from "@angular/core";
import { LineSvgMotion } from "svg-motion";

@Component({
	selector: "common-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
	private message: string = 'hello world';

	constructor(private injector: Injector){ }
	
	ngOnInit() {
		this.message = this.injector.get('message');
	}

	destroy(){
		this.injector.get('destroy')();
	}
}
