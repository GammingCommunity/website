export class GameRoom {
	id: number;
	name: string;
	logoUrl: string;

	constructor(room) {
		this.id = room._id;
		this.name = room.roomName;
		this.logoUrl = room.roomLogo;
	}
}
