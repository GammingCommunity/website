import { TranslateService } from '@ngx-translate/core';

export class ClientLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ClientLanguage': {
				'GAME': 'Game',
				'COMMUNITY': 'Community',
			}
		}, true);
		translateService.setTranslation('vi', {
			'ClientLanguage': {
				'GAME': 'Trò chơi',
				'COMMUNITY': 'Cộng đồng',
			}
		}, true);
	}
}
