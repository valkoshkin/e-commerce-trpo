import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import {
  UserOutline,
  UserAddOutline,
  LockOutline,
  ShopOutline,
  LoginOutline,
  LogoutOutline,
  HeartOutline,
  HeartFill,
  ShoppingCartOutline,
  InfoCircleOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { ProfileComponent } from './components/profile/profile.component';
import { UnauthorizedAccessOnlyGuard } from './guards/unauth-access-only.guard';
import { AuthorizedAccessOnlyGuard } from './guards/auth-access-only.guard';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ProductComponent } from './components/product/product.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CartComponent } from './components/cart/cart.component';
import { NzListModule } from 'ng-zorro-antd/list';

const icons = [
  UserOutline,
  UserAddOutline,
  LockOutline,
  ShopOutline,
  LoginOutline,
  LogoutOutline,
  HeartOutline,
  HeartFill,
  ShoppingCartOutline,
  InfoCircleOutline,
  PlusOutline,
];

const nzConfig: NzConfig = {
  notification: {
    nzDuration: 0,
    nzTop: 72,
    nzMaxStack: 4,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzIconModule.forRoot(icons),
    NzNotificationModule,
    NzAvatarModule,
    NzDescriptionsModule,
    NzSpinModule,
    NzBadgeModule,
    NzCardModule,
    NzEmptyModule,
    NzCommentModule,
    NzProgressModule,
    NzDividerModule,
    NzRateModule,
    NzModalModule,
    NzSelectModule,
    NzTagModule,
    NzListModule,
  ],
  providers: [
    UnauthorizedAccessOnlyGuard,
    AuthorizedAccessOnlyGuard,
    { provide: NZ_CONFIG, useValue: nzConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
