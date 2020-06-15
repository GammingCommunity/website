import { NgModule, ViewContainerRef } from "@angular/core";
import { ClientRoutingModule } from "./client.routing.module";
import { ClientComponent } from "./client.component";
import { CommonModule } from "@angular/common";
import { GameChannelComponent } from './game-channel/game-channel.component';
import { FriendsComponent } from './friends/friends.component';
import { JoinedRoomsComponent } from './game-channel/joined-rooms/joined-rooms.component';
import { GameRoomsComponent } from './game-channel/game-rooms/game-rooms.component';
import { ChatService } from 'src/app/common/services/chat.service';
import { ProfileComponent } from './profile/profile.component';
import { FriendChatComponent } from './friends/friend-chat/friend-chat.component';
import { FriendChatUIService } from './friends/friend-chat/friend-chat.ui.service';
import { IconsModule } from './client.feather-icon.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { RoomGlobalChatComponent } from './game-channel/room-global-chat/room-global-chat.component';
import { RoomPrivateChatComponent } from './game-channel/room-private-chat/room-private-chat.component';
import { RoomPrivateChatOptionsComponent } from './game-channel/room-private-chat/room-private-chat-options/room-private-chat-options.component';
import { SearchFriendsComponent } from './friends/search-friends/search-friends.component';
import { LookAccountComponent } from './look-account/look-account.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from 'src/app/common/dialogs/dialog.component';
import { LoaderComponent } from 'src/app/common/dialogs/loader/loader.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		ClientComponent,
		GameChannelComponent,
		FriendsComponent,
		JoinedRoomsComponent,
		HomeComponent,
		GameRoomsComponent,
		ProfileComponent,
		FriendChatComponent,
		RoomGlobalChatComponent,
		RoomPrivateChatComponent,
		SettingsComponent,
		RoomPrivateChatOptionsComponent,
		LookAccountComponent,
	],
	imports: [
		IconsModule,
		ClientRoutingModule,
		FormsModule,
		CommonModule,
		TranslateModule.forChild()
	],
	providers: [
		ChatService,
		FriendChatUIService,
	]
})
export class ClientModule { }
