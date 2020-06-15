import { Component, OnInit, Input, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientCommonComponent } from '../../client.common-component';
import { HomeGameDetailsLanguage } from './home-game-details.language';
import { GameChannel } from '../home.dto';
import { HomeGameDetailsUIService } from './home-game-details.ui.service';
import { ClientDataService } from '../../client.data.service';

@Component({
	selector: 'app-home-game-details',
	templateUrl: './home-game-details.component.html',
	styleUrls: ['./home-game-details.component.css']
})
export class HomeGameDetailsComponent extends ClientCommonComponent implements OnInit {
	private game: GameChannel;

	constructor(
		protected injector: Injector,
		private homeGameDetailsUIService: HomeGameDetailsUIService
	) {
		super(injector);
		HomeGameDetailsLanguage.define(this.translateService);

		this.homeGameDetailsUIService.seeGameDetailsFunc = (game: GameChannel) => {
			this.game = game;
			this.clientDataService.currentGameChannel = game;
		};
	}

	ngOnInit() {
	}
}
