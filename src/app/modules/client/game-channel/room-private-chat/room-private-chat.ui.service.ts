import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class RoomPrivateChatUIService {
	public showPrivateChatFunc: (data: any) => void;
	
	constructor() { }
}
