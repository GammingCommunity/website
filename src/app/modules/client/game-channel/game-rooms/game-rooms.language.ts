import { TranslateService } from '@ngx-translate/core';

export class GameRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Rooms list',
				'REQUESTED': 'Requested',
				'JOINED': 'Joined',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Phòng chat',
				'REQUESTED': 'Đã gửi yêu cầu',
				'JOINED': 'Đã tham gia',
			}
		}, true);
	}
}
