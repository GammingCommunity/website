import { TranslateService } from '@ngx-translate/core';

export class GameRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Rooms list',
				'ADD_ROOM': 'Add rooms',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Phòng chat',
				'ADD_ROOM': 'Tạo phòng',
			}
		}, true);
	}
}
