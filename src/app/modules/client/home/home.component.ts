import { Component, OnInit, Injector } from '@angular/core';
import { ClientCommonComponent } from '../client.common-component';
import { HomeLanguage } from './home.language';
import { HomeHttpService } from './home.http.service';
import { GameChannel } from './home.dto';
import { HomeGameDetailsUIService } from './home-game-details/home-game-details.ui.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent extends ClientCommonComponent implements OnInit {
	private games: GameChannel[];
	private selectedGame: GameChannel;

	constructor(
		private homeHttpService: HomeHttpService,
		private homeGameDetailsUIService: HomeGameDetailsUIService,
		protected injector: Injector
	) {
		super(injector);
		HomeLanguage.define(this.translateService);

		this.fetchGameChannels();
	}

	ngOnInit() {
	}

	seeGameDetails(game: GameChannel){
		this.homeGameDetailsUIService.seeGameDetailsFunc(game);
		this.selectedGame = game;
	}

	fetchGameChannels() {
		this.homeHttpService.fetchGameChannels().subscribe(data => {
			this.games = data;
		})
	}
}
