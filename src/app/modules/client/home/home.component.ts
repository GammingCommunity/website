import { Component, OnInit, Injector } from '@angular/core';
import { ClientCommonComponent } from '../client.common-component';
import { HomeLanguage } from './home.language';
import { HomeHttpService } from './profile.http.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends ClientCommonComponent implements OnInit {
	// private oldProfile: Profile;
	// private newProfile: Profile;

	constructor(
		private homeHttpService: HomeHttpService,
		protected injector: Injector
	) {
		super(injector);
		HomeLanguage.define(this.translateService);
	}

	ngOnInit() {
	}
}
