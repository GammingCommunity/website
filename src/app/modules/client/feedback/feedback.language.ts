import { TranslateService } from '@ngx-translate/core';

export class FeedbackLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FeedbackLanguage': {
				'SEND': 'Send',
			}
		}, true);
		translateService.setTranslation('vi', {
			"FeedbackLanguage": {
				'SEND': 'Gửi',
			}
		}, true);
	}
}
