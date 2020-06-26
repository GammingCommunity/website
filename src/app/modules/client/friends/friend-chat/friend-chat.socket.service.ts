import { Injectable, Injector } from '@angular/core';
import { ServiceUrls } from 'src/environments/environment';
import { SendingMessage } from './friend-chat.dto';
import { ClientCommonService } from '../../client.common-service';
import { SocketioHelper } from 'src/app/common/helpers/socketio';

@Injectable({
	providedIn: "root"
})
export class FriendChatSocketService extends ClientCommonService {
	private chatId: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
	}

	initSocket(
		onFunc: (message: string, chatId: string) => void,
		emitFunc: (
			sendMessage: (message: SendingMessage) => void
		) => void
		,
		onChatId: (chatId: string) => void
	) {
		const socket = SocketioHelper.init(ServiceUrls.chat);
		socket.emit('request-socket-id');
		socket.on('get-socket-id', (chatId: string) => {
			this.chatId = chatId;
			onChatId(chatId);
		});
		emitFunc((message: SendingMessage) => {
			socket.emit('chat-private', [
				{ chatID: this.chatId },
				message
			]);
		});
		socket.on('receive-message-private', (message: string) => {
			alert();
			onFunc(message, this.chatId);
		});

	}
}
