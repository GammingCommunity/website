import { Component, OnInit, Injector } from '@angular/core';
import { AccountLookingResult, AccountRelationShipType } from './look-account.dto';
import { ActivatedRoute } from '@angular/router';
import { LookAccountHttpService } from './look-account.http.service';
import { ClientCommonComponent } from '../client.common-component';
import { LookAccountLanguage } from './look-account.language';

@Component({
	selector: 'app-look-account',
	templateUrl: './look-account.component.html',
	styleUrls: ['./look-account.component.css']
})
export class LookAccountComponent extends ClientCommonComponent implements OnInit {
	private lookingAccount: AccountLookingResult;
	private accountRelationShipType = AccountRelationShipType;


	constructor(
		protected injector: Injector,
		private route: ActivatedRoute,
		private lookAccountHttpService: LookAccountHttpService
	) {
		super(injector);
		LookAccountLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.look();
	}


	sendFriendRequest(id) {
		this.lookAccountHttpService.sendFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	acceptFriendRequest(id) {
		this.lookAccountHttpService.acceptFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	cancelFriendRequest(id) {
		this.lookAccountHttpService.cancelFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	unsendFriendRequest(id) {
		this.lookAccountHttpService.unsendFriendRequest(id).subscribe(result => {
			if (result) {

			} else {
				alert(`line 24 - search-fiends.component.ts`);
			}
		});
	}

	look() {
		const lookingAccountId = Number(this.route.snapshot.paramMap.get('id'));
		if (lookingAccountId) {
			this.lookAccountHttpService.look(lookingAccountId).subscribe(lookedAccount => {
				this.lookingAccount = lookedAccount;
			});
		} else {
			console.log(lookingAccountId);
		}
	}
}
