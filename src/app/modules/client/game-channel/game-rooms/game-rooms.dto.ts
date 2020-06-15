export class GameRoom {
	id: string;
	code: string;
	name: string;
	logoUrl: string;
	describe: string;
	backgroundUrl: string;
	isRequesting: boolean;
	hasJoined: boolean;
	isPrivate: boolean;
	maxMember: number;
	countMember: number;
	isRequestingFromClient: boolean = false;

	constructor(rawData){
		this.id = rawData._id;
		this.name = rawData.roomName;
		this.code = rawData.code;
		this.logoUrl = rawData.roomLogo;
		this.backgroundUrl = rawData.roomBackground;
		this.hasJoined = rawData.isJoin;
		this.isRequesting = rawData.isRequest;
		this.maxMember = rawData.maxOfMember;
		this.countMember = rawData.countMember;
		this.isPrivate = rawData.isPrivate;
	}
}

export class JoiningRoomResult {
	payload: string;
	success: string;
	message: string;

	constructor(rawData){
		this.payload = rawData.payload;
		this.success = rawData.success;
		this.message = rawData.message;
	}
}