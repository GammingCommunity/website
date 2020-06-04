import { TranslateService } from '@ngx-translate/core';

export class ClientLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ClientLanguage': {
				'GAME': 'Games',
				'COMMUNITY': 'Community',
				'OPTIONS': 'Options',
			}
		}, true);
		translateService.setTranslation('vi', {
			'ClientLanguage': {
				'GAME': 'Trò chơi',
				'COMMUNITY': 'Cộng đồng',
				'OPTIONS': 'Tùy chỉnh',
			}
		}, true);
	}
}
