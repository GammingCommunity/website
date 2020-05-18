import { NgModule } from "@angular/core";
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
import { FriendChatService } from './friends/friend-chat/friend-chat.service';
import { RoomChatComponent } from './game-channel/room-chat/room-chat.component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';

@NgModule({
	declarations: [ClientComponent, GameChannelComponent, FriendsComponent, JoinedRoomsComponent, GameRoomsComponent, ProfileComponent, FriendChatComponent, RoomChatComponent, ProfileDropdownComponent],
	imports: [ClientRoutingModule, CommonModule],
	providers: [ChatService, FriendChatService]
})
export class ClientModule { }
