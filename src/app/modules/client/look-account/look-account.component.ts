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


	sendFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.sendFriendRequest(this.lookingAccount.id).subscribe(result => {
			if (result) {
				this.lookingAccount.relationship = this.accountRelationShipType.FRIEND_REQUEST;
			}
			this.lookingAccount.isRequesting = false;
		});
	}

	acceptFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.acceptFriendRequest(this.lookingAccount.id).subscribe(result => {
			if (result) {
				this.lookingAccount.relationship = this.accountRelationShipType.FRIEND;
			}
			this.lookingAccount.isRequesting = false;
		});
	}

	cancelFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.cancelFriendRequest(this.lookingAccount.id).subscribe(result => {
			if (result) {
				this.lookingAccount.relationship = this.accountRelationShipType.STRANGER;
			}
			this.lookingAccount.isRequesting = false;
		});
	}

	unsendFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.unsendFriendRequest(this.lookingAccount.id).subscribe(result => {
			if (result) {
				this.lookingAccount.relationship = this.accountRelationShipType.STRANGER;
			}
			this.lookingAccount.isRequesting = false;
		});
	}

	look() {
		const lookingAccountId = Number(this.route.snapshot.paramMap.get('id'));
		if (lookingAccountId && lookingAccountId !== this.currentAccountId) {
			this.lookAccountHttpService.look(lookingAccountId).subscribe(lookedAccount => {
				this.lookingAccount = lookedAccount;
			});
		} else {
			alert(this.currentAccountId);
		}
	}
}
