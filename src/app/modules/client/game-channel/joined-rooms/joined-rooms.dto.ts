export class JoinedRoom {
	id: string;
	name: string;
	code: string;
	logoUrl: string;

	constructor(room) {
		this.id = room._id;
		this.name = room.roomName;
		this.logoUrl = room.roomLogo;
		this.code = room.code;
	}
}
