import { Component, OnInit } from '@angular/core';
import { SettingsHttpService } from './settings.http.service';
import { Settings, AccountEditingResultStatus } from './settings.dto';
import { AccountPrivacyType } from 'src/app/common/constants/account';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { ObjectHelper } from 'src/app/common/helpers/object';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	private oldSettings: Settings;
	private newSettings: Settings;
	private accountPrivacyList: string[];

	constructor(private settingsHttpService: SettingsHttpService, private alertService: AlertService) {
		this.accountPrivacyList = AccountPrivacyType.createList();
	}

	ngOnInit() {
		this.fetchSettings();
	}

	updateSettings() {
		if (ObjectHelper.isDifferent(this.oldSettings, this.newSettings)) {
			this.settingsHttpService.updateSettings(this.newSettings).subscribe(
				result => {
					if (result.status === AccountEditingResultStatus.SUCCESS) {
						this.oldSettings = Object.assign(new Settings(), this.newSettings);
					} else {
						this.alertService.show(result.status);
					}
				}
			)
		};
	}

	protected fetchSettings() {
		this.settingsHttpService.fetchSettings().subscribe(settings => {
			this.oldSettings = settings;
			this.newSettings = Object.assign(new Settings(), settings);
		});
	}
}
