import { Component, OnInit } from '@angular/core';
import {
  AddToCartResponse,
  AddToFavoritesResponse,
  CreateReviewPayload,
  EditProductPayload, LinkedProducts,
  MessageWrapper,
  Product,
  Review,
  Role,
  User
} from '../../common/types';
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
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

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

  dialogLoading: boolean = false;

  isAdmin: boolean = false;

  favorites: Product[] = [];

  cart: Product[] = [];

  deleteDialogVisible: boolean = false;

  editDialogVisible: boolean = false;

  reviewDialogVisible: boolean = false;

  editForm!: UntypedFormGroup;

  reviewForm!: UntypedFormGroup;

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private notification: NzNotificationService,
    private router: Router,
    private userService: UserService
  ) {}

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
    this.dialogLoading = true;
    const observer: Partial<Observer<MessageWrapper>> = {
      next: (messageWrapper: MessageWrapper) => {
        this.notification.success('Операция выполнена', messageWrapper.message);
        this.dialogLoading = false;
        onSuccess?.();
      },
      error: (error: HttpErrorResponse) => {
        this.dialogLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.createReview(payload).subscribe(observer);
  }

  private deleteProduct(productId: number, onSuccess?: () => void) {
    this.dialogLoading = true;
    const observer: Partial<Observer<MessageWrapper>> = {
      next: (messageWrapper: MessageWrapper) => {
        this.notification.success('Операция выполнена', messageWrapper.message);
        this.dialogLoading = false;
        onSuccess?.();
      },
      error: (error: HttpErrorResponse) => {
        this.dialogLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.deleteProduct(productId).subscribe(observer);
  }

  private editProduct(productId: number, payload: EditProductPayload, onSuccess?: (product: Product) => void) {
    this.dialogLoading = true;
    const observer: Partial<Observer<Product>> = {
      next: (response: Product) => {
        this.dialogLoading = false;
        this.product = response;
        onSuccess?.(response);
      },
      error: (error: HttpErrorResponse) => {
        this.dialogLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.editProduct(productId, payload).subscribe(observer);
  }

  private fetchLinkedProducts(username: string) {
    const observer: Partial<Observer<LinkedProducts>> = {
      next: (response: LinkedProducts) => {
        this.cart = response.cart;
        this.favorites = response.favorites;
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error);
      },
    };

    this.userService.fetchLinkedProducts(username).subscribe(observer);
  }

  ngOnInit(): void {
    const userFromStorage = this.tokenStorage.getUser();
    if (userFromStorage) {
      this.isAdmin = userFromStorage.role === Role.ADMIN;
      this.fetchLinkedProducts(userFromStorage.username);
    }

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

  addToFavorites(): void {
    const observer: Partial<Observer<AddToFavoritesResponse>> = {
      next: (response: AddToFavoritesResponse) => {
        this.favorites = response.favorites;
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToFavorites(username, this.productId!).subscribe(observer);
  }

  isProductInFavorites(): boolean {
    return this.favorites.some(
      (product: Product) => product.productId === this.productId
    );
  }

  addToCart(): void {
    const observer: Partial<Observer<AddToCartResponse>> = {
      next: (response: AddToCartResponse) => {
        this.cart = response.cart;
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToCart(username, this.productId!).subscribe(observer);
  }

  isProductInCart(): boolean {
    return this.cart.some(
      (product: Product) => product.productId === this.productId
    );
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
    this.deleteProduct(this.productId!, () => {
      this.router.navigateByUrl("/").then();
    });
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
    if (this.editForm.valid) {
      this.editProduct(this.productId!, this.editForm.value, () => {
        this.editDialogVisible = false;
      })
    } else {
      Object.values(this.editForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
