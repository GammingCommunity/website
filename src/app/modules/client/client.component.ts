import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MyFriend, MyProfile } from "./client.dto";
import { ClientHttpService } from "./client.http.service";

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit, AfterViewInit {
	friends: MyFriend[];
	profile: MyProfile;

	ngOnInit() {}

	ngAfterViewInit() {
		this.fetchFriends();
		this.fetchProfile();
	}

	constructor(private thisHttpService: ClientHttpService) {}

	fetchFriends() {
		this.thisHttpService.fetchFriends(data => (this.friends = data));
	}
	fetchProfile() {
		this.thisHttpService.fetchProfile(data => (this.profile = data));
	}
}
