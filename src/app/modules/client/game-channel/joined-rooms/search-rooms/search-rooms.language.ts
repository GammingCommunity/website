import { TranslateService } from '@ngx-translate/core';

export class SearchRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'SearchRoomsLanguage': {
				'SEARCH': 'Search',
				'TYPE_HERE': 'Type here...',
				'BY_ROOM_NAME': 'Search by room name',
				'BY_ROOM_ID': 'Search by room id',
				'GAME': 'Game',
			}
		}, true);
		translateService.setTranslation('vi', {
			'SearchRoomsLanguage': {
				'SEARCH': 'Tìm ngay',
				'TYPE_HERE': 'Nhập thông tin tìm kiếm...',
				'BY_ROOM_NAME': 'Tìm theo tên phòng',
				'BY_ROOM_ID': 'Tìm theo mã phòng',
				'GAME': 'Tìm theo Game',
			}
		}, true);
	}
}
