import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: "[dialog]"
})
export class AdDirective {
	constructor(public viewContainerRef: ViewContainerRef) {}
}
