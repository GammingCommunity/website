import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, AfterViewChecked, Injector } from "@angular/core";
import { MyProfile } from "./client.dto";
import { ClientHttpService } from "./client.http.service";
import { ClientLanguage } from './client.language';
import { ClientCommonComponent } from './client.common-component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { CssConfigs } from 'src/environments/environment';

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent extends ClientCommonComponent implements OnInit, AfterViewInit {
	// @ViewChild('profileDropdown', { static: true }) profileDropdownER: ElementRef;
	// @ViewChild('profileDropdown', { static: true, read: ViewContainerRef }) profileDropdownVR: ViewContainerRef;
	private redirectLink: string;
	private profile: MyProfile;

	constructor(
		protected injector: Injector,
		private clientHttpService: ClientHttpService,
		private viewContainerRef: ViewContainerRef,
	) {
		super(injector);
		ClientLanguage.define(this.translateService);
		
		this.fetchProfile();
	}

	ngOnInit() {
	}
	
	ngAfterViewInit(){
	}

	redirectTo(link: string) {
		this.router.navigateByUrl(`/${link}`);
		this.redirectLink = link;
	}

	protected fetchProfile() {
		this.clientHttpService.fetchProfile().subscribe(data => {
			this.profile = data;
		});
	}

	protected showProfileDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: ProfileDropdownComponent,
			anchorElement: event.target,
			destroyIfOutFocus: true,
			anchorTo: 'left',
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			},
			zIndex: CssConfigs.dropdownMenuZIndex
		});
	}
}
