import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { GameChannelComponent } from "./game-channel/game-channel.component";

const routes: Routes = [
	{
		path: "",
		component: ClientComponent,
		children: [
			{
				path: "",
				redirectTo: "game-channel"
			},
			{
				path: "game-channel",
				component: GameChannelComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule {}
