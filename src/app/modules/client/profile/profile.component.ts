import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile.dto';
import { ProfileHttpService } from './profile.http.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	private profile: Profile;
	
	constructor(private profileHttpService: ProfileHttpService) { }

	ngOnInit() {
		this.profileHttpService.fetchProfile().subscribe(data => {
			this.profile = data;
		})
	}

}
