import { Component, OnInit } from '@angular/core';
import {CreateReviewPayload, MessageWrapper, Product, Review, Role, User} from '../../common/types';
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

  productLoading: boolean = false;

  reviews: Review[] | undefined;

  reviewsLoading: boolean = false;

  isAdmin: boolean = false;

  deleteDialogVisible: boolean = false;

  editDialogVisible: boolean = false;

  reviewDialogVisible: boolean = false;

  reviewDialogLoading: boolean = false;

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
    this.productLoading = true;
    const observer: Partial<Observer<Product>> = {
      next: (response: Product) => {
        this.product = response;
        this.productLoading = false;
        onSuccess?.(response);
      },
      error: (error: HttpErrorResponse) => {
        this.productLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.fetchProduct(productId).subscribe(observer);
  }

  private fetchReviews(productId: number, onSuccess?: (reviews: Review[]) => void) {
    this.reviewsLoading = true;
    const observer: Partial<Observer<Review[]>> = {
      next: (response: Review[]) => {
        this.reviews = response;
        this.reviewsLoading = false;
        onSuccess?.(response);
      },
      error: (error: HttpErrorResponse) => {
        this.reviewsLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.fetchReviews(productId).subscribe(observer);
  }

  private createReview(payload: CreateReviewPayload, onSuccess?: () => void) {
    this.reviewDialogLoading = true;
    const observer: Partial<Observer<MessageWrapper>> = {
      next: (messageWrapper: MessageWrapper) => {
        this.notification.success('Операция успешно выполнена', messageWrapper.message);
        this.reviewDialogLoading = false;
        onSuccess?.();
      },
      error: (error: HttpErrorResponse) => {
        this.reviewDialogLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.createReview(payload).subscribe(observer);
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
      this.fetchReviews(this.productId);
    }
  }

  buildAuthorName(user: User): string {
    const { firstName, lastName, username } = user;
    return `${firstName} ${lastName} [@${username}]`;
  }

  buildRatingText(): string {
    return '';
  }

  buildNzDateTime(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('ru-RU');
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
      const payload: CreateReviewPayload = {
        ...this.reviewForm.value,
        timestamp: new Date().getTime(),
        username: this.tokenStorage.getUser()!.username,
        productId: this.productId
      };
      this.createReview(payload, () => {
        this.reviewDialogVisible = false;
        this.fetchReviews(this.productId!);
      });
    } else {
      Object.values(this.reviewForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  reviewDialogCancel(): void {
    this.hideReviewDialog();
  }

  //// Review dialog
}
