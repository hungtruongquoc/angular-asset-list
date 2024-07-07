import {Routes} from '@angular/router';
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {IndexComponent} from "./index/index.component";
import {authenticationGuard} from "./authentication.guard";

export const routes: Routes = [
  {
    path: "", redirectTo: "index", pathMatch: "full"
  },
  {
    path: "login", component: LoginPageComponent,
  }, {
    path: "index", component: IndexComponent, canMatch: [authenticationGuard],
  }];
