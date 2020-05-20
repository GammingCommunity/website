import { Component, OnInit, Injector, ViewContainerRef, ComponentRef, AfterViewInit, ElementRef } from '@angular/core';
import { CssConfigs } from 'src/environments/environment';

@Component({
	selector: 'app-profile-dropdown',
	templateUrl: './profile-dropdown.component.html',
	styleUrls: ['./profile-dropdown.component.css'],
	styles: [`:host{z-index: ${CssConfigs.dropdownMenuZIndex} }`]
})
export class ProfileDropdownComponent implements OnInit, AfterViewInit {
	private destroy: () => void;

	constructor(private injector: Injector, private aadsf: ElementRef) {
		this.destroy = this.injector.get('destroy');
	}

	ngOnInit() {

	}

	ngAfterViewInit() {
	}
}
