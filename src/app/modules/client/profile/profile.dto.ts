export class Profile {
	id: number;
	name: string;
	avatarUrl: string;
	describe: string;
	email: string;
	phone: string;
	birthmonth: string;
	birthyear: string;
	setting: Setting;
	role: string;
	status: string;
	updatedAt: Date;
	createdAt: Date;

	constructor(profile) {
		this.id = profile.id;
		this.name = profile.name;
		this.avatarUrl = profile.avatar_url;
		this.describe = profile.describe;
		this.email = profile.email;
		this.phone = profile.phone;
		this.birthmonth = profile.birthmonth;
		this.birthyear = profile.birthyear;
		this.setting = new Setting(profile.setting);
		this.role = profile.role;
		this.status = profile.status;
		this.createdAt = profile.created_at;
		this.updatedAt = profile.updated_at;
	}
}

class Setting{
	anonymous: boolean;
	birthmonthPrivacy: string;
	birthyearPrivacy: string;
	emailPrivacy: string;
	phonePrivacy: string;

	constructor(setting) {
		this.anonymous = setting.anonymous;
		this.birthmonthPrivacy = setting.birthmonth_privacy;
		this.birthyearPrivacy = setting.birthyear_privacy;
		this.emailPrivacy = setting.email_privacy;
		this.phonePrivacy = setting.phone_privacy;
	}
}
