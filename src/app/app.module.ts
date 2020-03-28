import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { LoginComponent } from "./modules/login/login.component";
import { RegisterComponent } from "./modules/register/register.component";
import { SocketIoModule, SocketIoConfig } from "ng2-socket-io";
import { ServiceUrls } from 'src/environments/environment';

const socketIoConfig: SocketIoConfig = { url: ServiceUrls.mSerive, options: {} };

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		SocketIoModule.forRoot(socketIoConfig)
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
