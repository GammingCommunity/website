import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AlertComponent } from './common/dialogs/alert/alert.component';
import { LoaderComponent } from './common/dialogs/loader/loader.component';

const routes: Routes = [
	{
		path: "client",
		loadChildren: "./modules/client/client.module#ClientModule"
	},
	{
		path: "",
		loadChildren: "./modules/component/component.module#ComponentModule"
	},
	{
		path: "loading",
		component: LoaderComponent,
	},
	{
		path: "alert",
		component: AlertComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
