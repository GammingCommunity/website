import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientCommonService } from '../client.common-service';
import { GameChannel } from './game-channel.dto';


@Injectable({
	providedIn: "root"
})
export class GameChannelHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchGameChannels() {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					countRoomOnEachGame{
						_id
						name
						count
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): GameChannel[] => {
				let games: GameChannel[] = [];

				data.countRoomOnEachGame.forEach(game => {
					games.push(new GameChannel(game));
				})

				return games;
			}
		));
	}
}
