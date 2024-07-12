import { Routes } from '@angular/router';
import {CreatePasswordComponent} from "./components/create-password/create-password.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

export const routes: Routes = [
  {path: "password", component: CreatePasswordComponent},
  {path: 'login', component: LoginPageComponent}
];
