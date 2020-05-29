import { TranslateService } from '@ngx-translate/core';

export class ProfileLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ProfileLanguage': {
				'SETTING': 'Setting',
				'PROFILE': 'Profile',
			}
		}, true);
		translateService.setTranslation('vi', {
			'ProfileLanguage': {
				'SETTING': 'Cài đặt',
				'PROFILE': 'Thông tin',
			}
		}, true);
	}
}
