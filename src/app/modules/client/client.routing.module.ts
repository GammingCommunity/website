import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { GameChannelComponent } from "./game-channel/game-channel.component";
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
	{
		path: "",
		component: ClientComponent,
		children: [
			{
				path: "game-channel",
				component: GameChannelComponent
			},
			{
				path: "profile",
				component: ProfileComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule {}
