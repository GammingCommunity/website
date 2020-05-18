export class MyProfile {
	id: number;
	name: string;
	avatarUrl: string;

	constructor(profile){
		this.id = profile.id;
		this.name = profile.name;
		this.avatarUrl = profile.avatar_url;
	}
}
