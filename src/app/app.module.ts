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

@NgModule({
	declarations: [
		AppComponent,
		LoaderComponent,
		AlertComponent,
		FeedbackComponent,
		SearchFriendsComponent,
		ProfileDropdownComponent
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
		FeedbackComponent, 
		SearchFriendsComponent, 
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
