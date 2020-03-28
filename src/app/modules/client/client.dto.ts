export class MyFriend {
	id: Number;
	name: String;
	avatarUrl: String;

	constructor(rawFriend: any) {
		this.id = rawFriend.id;
		this.name = rawFriend.name;
		this.avatarUrl = rawFriend.avatar_url;
	}
}

export class MyProfile {
	id: Number;
	name: String;
	avatarUrl: String;

	constructor(rawProfile: any) {
		this.id = rawProfile.id;
		this.name = rawProfile.name;
		this.avatarUrl = rawProfile.avatar_url;
	}
}
