import { TranslateService } from '@ngx-translate/core';

export class LookAccountLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'LookAccountLanguage': {
				'SEARCH': 'Search',
				'UNFRIEND_REQUEST': 'Cancel friend request',
				'CONFIRM': 'Confirm',
				'CANCEL': 'Cancel',
				'MAKE_FRIEND': 'Make friend',
				'FRIEND': 'Friend',
			}
		}, true);
		translateService.setTranslation('vi', {
			'LookAccountLanguage': {
				'SEARCH': 'Tìm',
				'UNFRIEND_REQUEST': 'Huỷ yêu cầu kết bạn',
				'CONFIRM': 'Đồng ý',
				'CANCEL': 'Huỷ',
				'MAKE_FRIEND': 'Kết bạn',
				'FRIEND': 'Bạn bè',
			}
		}, true);
	}
}
