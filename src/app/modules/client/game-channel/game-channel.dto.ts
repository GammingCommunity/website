export class GameChannel {
	id: number;
	name: string;
	roomNumber: number;

	constructor(raw) {
		this.id = raw._id;
		this.name = raw.name;
		this.roomNumber = raw.count;
	}
}
