export class Friend {
	id: number;
	name: string;
	avatarUrl: string;

	constructor(friend) {
		this.id = friend.id;
		this.name = friend.name;
		this.avatarUrl = friend.avatar_url;
	}
}
