import { Component, OnInit } from '@angular/core';
import { Order, Role, User } from '../../common/types';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null | undefined;

  loading: boolean = true;

  isAdmin: boolean = false;

  orders: Order[] = [];

  constructor(private tokenStorage: TokenStorageService) {} // + profile service

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      this.user = this.tokenStorage.getUser(); // temp hack
      this.isAdmin = this.user?.role === Role.ADMIN;
      this.orders = [
        {
          orderId: 1,
          user: this.user!,
          date: 'now',
          price: 151780,
          products: [
            {
              productId: 1,
              price: 94990,
              name: 'Huawei Matebook D16',
              description: 'Ноутбук рабочий не сломанный',
              category: 'Ноутбуки',
            },
            {
              productId: 2,
              price: 56780,
              name: 'Huawei Matebook D14',
              description: 'Ноутбук сломанный',
              category: 'Ноутбуки',
            },
          ],
        },
        {
          orderId: 2,
          user: this.user!,
          date: 'now',
          price: 151780,
          products: [
            {
              productId: 1,
              price: 94990,
              name: 'Huawei Matebook D16',
              description: 'Ноутбук рабочий не сломанный',
              category: 'Ноутбуки',
            },
            {
              productId: 2,
              price: 56780,
              name: 'Huawei Matebook D14',
              description: 'Ноутбук сломанный',
              category: 'Ноутбуки',
            },
          ],
        },
      ];
    }, 1000);
  }
}
