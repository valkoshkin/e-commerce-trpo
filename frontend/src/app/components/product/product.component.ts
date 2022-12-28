import { Component, OnInit } from '@angular/core';
import { Product, Role, User } from '../../common/types';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products/products.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  productId: number | undefined;

  loading: boolean = false;

  isAdmin: boolean = false;

  deleteDialogVisible: boolean = false;

  editDialogVisible: boolean = false;

  reviewDialogVisible: boolean = false;

  editForm!: UntypedFormGroup;

  reviewForm!: UntypedFormGroup;

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private notification: NzNotificationService
  ) {} // + profile service

  private fetchProduct(
    productId: number,
    onSuccess?: (product: Product) => void
  ) {
    this.loading = true;
    const observer: Partial<Observer<Product>> = {
      next: (response: Product) => {
        this.product = response;
        this.loading = false;
        onSuccess?.(response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.fetchProduct(productId).subscribe(observer);
  }

  ngOnInit(): void {
    this.isAdmin = this.tokenStorage.getUser()?.role === Role.ADMIN;

    this.reviewForm = this.fb.group({
      content: [undefined, []],
      rating: [null, [Validators.required]],
    });

    const idFromUrl = new URLSearchParams(location.search).get('id');
    this.productId = idFromUrl ? +idFromUrl : undefined;

    if (this.productId) {
      this.fetchProduct(this.productId, (product: Product) => {
        this.editForm = this.fb.group({
          name: [product.name, [Validators.required]],
          description: [product.description, [Validators.required]],
          price: [product.price, [Validators.required]],
        });
      });
    }
  }

  buildAuthorName(user: User): string {
    const { firstName, lastName, username } = user;
    return `${firstName} ${lastName} [@${username}]`;
  }

  buildRatingText(): string {
    return '';
  }

  // Delete dialog

  showDeleteDialog(): void {
    this.deleteDialogVisible = true;
  }

  hideDeleteDialog(): void {
    this.deleteDialogVisible = false;
  }

  deleteDialogOk(): void {
    console.log(`Delete product`);
  }

  deleteDialogCancel(): void {
    this.hideDeleteDialog();
  }

  //// Delete dialog

  // Edit dialog

  showEditDialog(): void {
    this.editDialogVisible = true;
  }

  hideEditDialog(): void {
    this.editDialogVisible = false;
  }

  editDialogOk(): void {
    console.log(`Edit product`);
  }

  editDialogCancel(): void {
    this.hideEditDialog();
  }

  afterEditDialogClose(): void {
    this.editForm = this.fb.group({
      name: [this.product!.name, [Validators.required]],
      description: [this.product!.description, [Validators.required]],
      price: [this.product!.price, [Validators.required]],
    });
  }

  //// Delete dialog

  // Review dialog

  showReviewDialog(): void {
    this.reviewDialogVisible = true;
  }

  hideReviewDialog(): void {
    this.reviewDialogVisible = false;
  }

  reviewDialogOk(): void {
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value);
    } else {
    }
  }

  reviewDialogCancel(): void {
    this.hideReviewDialog();
  }

  //// Review dialog
}
