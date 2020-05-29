import { TranslateService } from '@ngx-translate/core';

export class RoomGlobalChatLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'RoomGlobalChatLanguage': {
				'GLOBAL_CHAT': 'Global chat',
			}
		}, true);
		translateService.setTranslation('vi', {
			'RoomGlobalChatLanguage': {
				'GLOBAL_CHAT': 'Chat chung',
			}
		}, true);
	}
}
