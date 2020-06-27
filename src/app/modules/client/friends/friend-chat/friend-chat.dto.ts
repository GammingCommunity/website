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

export class MessageTypes {
	static readonly TEXT = 'text';
	static readonly IMG = 'image';
	static readonly VIDEO = 'video';
	static readonly GIF = 'gif';
	static readonly URL = 'url';
	static readonly FILE = 'file';
}

export class SendingMessage {
	receiverId: number;
	messageType: string;
	text: { content: string };
	media: string;
}

export class Message {
	id: string;
	messageType: string;
	status: string;
	createdAt: Date;
	content: string;
	isMyMessage: boolean = false;

	constructor(friend = null) {
		if (friend) {
			this.id = friend.id;
			this.messageType = friend.messageType;
			this.status = friend.status;
			this.createdAt = friend.createAt;
			this.content = friend.text.content;
		}
	}
}