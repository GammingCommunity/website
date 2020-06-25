// export class SearchRoomOptionEnum {
// 	static SEARCH_BY_NAME = 'byName';
//     static SEARCH_BY_ID = 'byID';
// }

export class RoomInput {
	name: string;
	describe: string = '';
	isPrivate: boolean;
	maxMember: number;
}

export class ResultCRUD {
	success: string;
	message: string;
	payload: string;

	constructor(rawData){
		this.success = rawData.success;
		this.message = rawData.message;
		this.payload = rawData.payload;
	}
}
