export class Room {
	id: string;
	code: string;
	name: string;
	logoUrl: string;
	describe: string;
	isRequesting: boolean;
	hasJoined: boolean;
	isPrivate: boolean;

	constructor(rawData){
		this.id = rawData._id;
		this.name = rawData.roomName;
		this.code = rawData.code;
		this.logoUrl = rawData.roomLogo;
		this.hasJoined = rawData.isJoin;
		this.isRequesting = rawData.isRequest;
		this.isPrivate = rawData.isPrivate;
	}
}
