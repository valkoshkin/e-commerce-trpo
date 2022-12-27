import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UnauthorizedAccessOnlyGuard } from './guards/unauth-access-only.guard';
import { AuthorizedAccessOnlyGuard } from './guards/auth-access-only.guard';
import { ProductComponent } from './components/product/product.component';
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthorizedAccessOnlyGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthorizedAccessOnlyGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthorizedAccessOnlyGuard],
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthorizedAccessOnlyGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
