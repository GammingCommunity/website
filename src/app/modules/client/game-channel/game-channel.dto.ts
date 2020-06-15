export class LittleGameChannel {
	id: string;
	name: string;

	constructor(raw) {
		this.id = raw._id;
		this.name = raw.name;
	}
}
