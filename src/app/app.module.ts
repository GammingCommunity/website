import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './common/dialogs/loader/loader.service';
import { LoaderComponent } from './common/dialogs/loader/loader.component';
import { TimeoutInterceptor, DEFAULT_TIMEOUT } from './interceptors/timeout.interceptor';
import { AlertComponent } from './common/dialogs/alert/alert.component';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ServiceUrls, environment } from 'src/environments/environment';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AlertService } from './common/dialogs/alert/alert.service';
import { DialogService } from './common/dialogs/dialog.service';
import { ProfileDropdownComponent } from './modules/client/profile-dropdown/profile-dropdown.component';
import { IconsModule } from './modules/client/client.feather-icon.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './modules/client/feedback/feedback.component';
import { FormsModule } from '@angular/forms';
import { SearchFriendsComponent } from './modules/client/friends/search-friends/search-friends.component';
import { RequestLoggerInterceptor } from './interceptors/request-logger.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { DialogComponent } from './common/dialogs/dialog.component';
import { FriendItemDropdownComponent } from './modules/client/friends/friend-item-dropdown/friend-item-dropdown.component';
import { LookAccountOptionsDropdownComponent } from './modules/client/look-account/look-account-options-dropdown/look-account-options-dropdown.component';
import { LookAccountFriendedOptionsDropdownComponent } from './modules/client/look-account/look-account-friended-options-dropdown/look-account-friended-options-dropdown.component';
import { SearchRoomsComponent } from './modules/client/game-channel/joined-rooms/search-rooms/search-rooms.component';
import { ClientComponent } from './modules/client/client.component';
import { GameChannelComponent } from './modules/client/game-channel/game-channel.component';
import { FriendsComponent } from './modules/client/friends/friends.component';
import { JoinedRoomsComponent } from './modules/client/game-channel/joined-rooms/joined-rooms.component';
import { GameRoomsComponent } from './modules/client/game-channel/game-rooms/game-rooms.component';
import { ProfileComponent } from './modules/client/profile/profile.component';
import { FriendChatComponent } from './modules/client/friends/friend-chat/friend-chat.component';
import { RoomGlobalChatComponent } from './modules/client/game-channel/room-global-chat/room-global-chat.component';
import { RoomPrivateChatComponent } from './modules/client/game-channel/room-private-chat/room-private-chat.component';
import { SettingsComponent } from './modules/client/settings/settings.component';
import { RoomPrivateChatOptionsComponent } from './modules/client/game-channel/room-private-chat/room-private-chat-options/room-private-chat-options.component';
import { LookAccountComponent } from './modules/client/look-account/look-account.component';
import { AutofocusDirective } from './common/directives/autofocus.derective';

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent,
		DialogComponent,
		AlertComponent,
		FeedbackComponent,
		SearchFriendsComponent,
		SearchRoomsComponent,
		ProfileDropdownComponent,
		LookAccountOptionsDropdownComponent,
		LookAccountFriendedOptionsDropdownComponent,
		FriendItemDropdownComponent,
		AutofocusDirective,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		ApolloModule,
		IconsModule,
		FormsModule,
		HttpLinkModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot()
	],
	providers: [
		CookieService,
		LoaderService,
		AlertService,
		DialogService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RequestLoggerInterceptor, multi: true },
		{ provide: DEFAULT_TIMEOUT, useValue: environment.requestTimeOut }
	],
	entryComponents: [
		LoaderComponent,
		ProfileDropdownComponent,
		FriendItemDropdownComponent,
		LookAccountFriendedOptionsDropdownComponent,
		LookAccountOptionsDropdownComponent,
		FeedbackComponent,
		SearchFriendsComponent,
		SearchRoomsComponent,
		DialogComponent,
		AlertComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(apollo: Apollo, httpLink: HttpLink) {
		apollo.create({
			link: httpLink.create({ uri: ServiceUrls.accountManagement }),
			cache: new InMemoryCache()
		}, 'accountManagementService');
		apollo.create({
			link: httpLink.create({ uri: ServiceUrls.main }),
			cache: new InMemoryCache()
		}, 'mainService');
	}
}
