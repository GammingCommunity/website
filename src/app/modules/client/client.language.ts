import { TranslateService } from '@ngx-translate/core';

export class ClientLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ClientLanguage': {
				'GAME': 'Games',
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
