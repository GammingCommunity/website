import { TranslateService } from '@ngx-translate/core';

export class CreateRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'CreateRoomsLanguage': {
				'SEARCH': 'Search',
				'TYPE_HERE': 'Type here...',
				'BY_ROOM_NAME': 'Search by room name',
				'BY_ROOM_ID': 'Search by room id',
			}
		}, true);
		translateService.setTranslation('vi', {
			'CreateRoomsLanguage': {
				'SEARCH': 'Tìm ngay',
				'TYPE_HERE': 'Nhập thông tin tìm kiếm...',
				'BY_ROOM_NAME': 'Tìm theo tên phòng',
				'BY_ROOM_ID': 'Tìm theo mã phòng',
			}
		}, true);
	}
}
