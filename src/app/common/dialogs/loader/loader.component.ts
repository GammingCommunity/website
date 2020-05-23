import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit, DoCheck, OnChanges } from "@angular/core";
import { LineSvgMotion } from "svg-motion";
import { CssConfigs } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: "common-loader",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.css"],
	styles: [`:host{z-index: ${CssConfigs.loaderZIndex} }`],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('100ms ease', style({ opacity: 1 }))
			]),
			transition(':leave', [
				animate('100ms ease', style({ opacity: 0 }))
			])
		])
	],
	host: { '[@fadeInOut]': 'in' }
})
export class LoaderComponent implements OnInit, OnDestroy {
	@ViewChild('spinner', { static: true }) private spinnerRef: ElementRef<HTMLElement>;
	private motion: LineSvgMotion;

	constructor(){
		this.motion = new LineSvgMotion();
	}

	ngOnInit() {
		const spinnerElement = this.spinnerRef.nativeElement;
		this.motion.animateLineGroup(spinnerElement.getAttribute('d'), spinnerElement, {
			mode: 'loading',
			time: 700
		});
	}

	ngOnDestroy() {
		if (this.motion) {
			this.motion.removeAllLineAnimation();
		}
	}
}
