import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.products = [
        {
          productId: 1,
          name: 'Huawei Matebook D16',
          description: 'Ноутбук серого цвета',
          price: 64990,
          category: 'Ноутбуки',
          reviews: [],
        },
        {
          productId: 2,
          name: 'Huawei Matebook D14',
          description: 'Ноутбук черного цвета',
          price: 62990,
          category: 'Ноутбуки',
          reviews: [],
        },
      ];
      this.loading = false;
    }, 2000);
  }
}
