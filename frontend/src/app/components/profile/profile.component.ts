import { Component, OnInit } from '@angular/core';
import { Order, Role, User, UserData } from '../../common/types';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { UserService } from '../../services/user/user.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserData | undefined;

  orders: Order[] = [];

  loading: boolean = false;

  ordersLoading: boolean = false;

  isAdmin: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private notification: NzNotificationService
  ) {}

  private fetchUserData(username: string) {
    this.loading = true;
    const observer: Partial<Observer<UserData>> = {
      next: (response: UserData) => {
        this.user = response;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.notification.error('Ошибка', error.error.message || error.message);
      },
    };
    this.userService.fetchUserData(username).subscribe(observer);
  }

  private fetchOrders(username: string) {
    this.ordersLoading = true;
    const observer: Partial<Observer<Order[]>> = {
      next: (response: Order[]) => {
        this.orders = response;
        this.ordersLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.ordersLoading = false;
        this.notification.error('Ошибка', error.error.message || error.message);
      },
    };
    this.userService.fetchOrders(username).subscribe(observer);
  }

  ngOnInit(): void {
    const userFromStorage = this.tokenStorage.getUser() as User;

    this.isAdmin = userFromStorage.role === Role.ADMIN;
    this.fetchUserData(userFromStorage.username);
    this.fetchOrders(userFromStorage.username);
  }

  buildDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString("ru-ru");
  }
}
