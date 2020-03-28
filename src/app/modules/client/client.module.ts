import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ClientRoutingModule } from "./client.routing.module";
import { ClientHttpService } from "./client.http.service";
import { ClientComponent } from "./client.component";
import { CommonModule } from "@angular/common";
import { GameChannelComponent } from './game-channel/game-channel.component';

@NgModule({
	declarations: [ClientComponent, GameChannelComponent],
	imports: [ClientRoutingModule, CommonModule],
	providers: [ClientHttpService]
})
export class ClientModule {}
