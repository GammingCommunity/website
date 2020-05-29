import { TranslateService } from '@ngx-translate/core';

export class FriendChatLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FriendChatLanguage': {
				'SEND': 'Send',
			}
		}, true);
		translateService.setTranslation('vi', {
			'FriendChatLanguage': {
				'SEND': 'Gửi',
			}
		}, true);
	}
}
