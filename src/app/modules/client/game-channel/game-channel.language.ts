import { TranslateService } from '@ngx-translate/core';

export class GameChannelLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameChannelLanguage': {
				'aaaa': 'bbbbbb',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameChannelLanguage': {
				'aaaa': 'bbbbbb',
			}
		}, true);
	}
}
