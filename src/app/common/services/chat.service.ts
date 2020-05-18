import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ServiceUrls } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
	private socket: SocketIOClient.Socket;

	constructor() {
		// this.socket = io(ServiceUrls.chat);
	}

	// // EMITTER
	// sendMessage(msg: string) {
	// 	this.socket.emit('sendMessage', { message: msg });
	// }

	// // HANDLER
	// onNewMessage() {
	// 	return Observable.create(observer => {
	// 		this.socket.on('request-socket-id', msg => {
	// 			observer.next(msg);
	// 		});
	// 	});
	// }

	requestId(){
		this.socket.emit('request-socket-id');
	}

	requestJoinRoom(){
		this.socket.emit('join-group', '5ea7f623ec8a1c02e4e19497');
	}

	onRequest(){
		return Observable.create(observer => {
			this.socket.on('get-socket-id', id => {
				observer.next(id);
			});
		});
	}
}