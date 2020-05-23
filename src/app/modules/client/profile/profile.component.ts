import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, AccountEditingResultStatus } from './profile.dto';
import { ProfileHttpService } from './profile.http.service';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { ObjectHelper } from 'src/app/common/helpers/object';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	private oldProfile: Profile;
	private newProfile: Profile;

	constructor(
		private profileHttpService: ProfileHttpService,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.profileHttpService.fetchProfile().subscribe(profile => {
			this.oldProfile = profile;
			this.newProfile = Object.assign(new Profile(), profile);
		})
	}

	updateProfile() {
		if (ObjectHelper.isDifferent(this.oldProfile, this.newProfile)) {
			this.profileHttpService.updateProfile(this.newProfile).subscribe(
				result => {
					if (result.status === AccountEditingResultStatus.SUCCESS) {
						this.oldProfile = Object.assign(new Profile(), this.newProfile);
					} else {
						this.alertService.show(result.status);
					}
				}
			)
		};
	}
}
