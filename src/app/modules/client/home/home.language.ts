import { TranslateService } from '@ngx-translate/core';

export class HomeLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'HomeLanguage': {
				'SETTING': 'Setting',
			}
		}, true);
		translateService.setTranslation('vi', {
			'HomeLanguage': {
				'SETTING': 'Cài đặt',
			}
		}, true);
	}
}
