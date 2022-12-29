import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AddToCartResponse,
  AddToFavoritesResponse,
  CreateProductPayload,
  LinkedProducts,
  MessageWrapper,
  Product,
  Role,
} from '../../common/types';
import { ProductsService } from '../../services/products/products.service';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  productsLoading: boolean = false;

  categories: string[] = [];

  categoriesLoading: boolean = false;

  selectedCategories: string[] = [];

  favoritesChecked: boolean = false;

  isAuthorized: boolean = false;

  isAdmin: boolean = false;

  addForm!: UntypedFormGroup;

  addDialogVisible: boolean = false;

  addDialogLoading: boolean = false;

  cart: Product[] = [];

  favorites: Product[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private notification: NzNotificationService,
    private userService: UserService
  ) {}

  private fetchCategories() {
    this.categoriesLoading = true;
    const observer: Partial<Observer<string[]>> = {
      next: (response: string[]) => {
        this.categories = response;
        this.categoriesLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.categoriesLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.fetchCategories().subscribe(observer);
  }

  private fetchProducts(categories: string[]) {
    this.productsLoading = true;
    const observer: Partial<Observer<Product[]>> = {
      next: (response: Product[]) => {
        this.products = response;
        this.productsLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.productsLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };
    this.productsService.fetchProducts(categories).subscribe(observer);
  }

  private createProduct(payload: CreateProductPayload, onSuccess?: () => void) {
    this.addDialogLoading = true;

    const observer: Partial<Observer<MessageWrapper>> = {
      next: (response: MessageWrapper) => {
        this.notification.success('Операция выполнена', response.message);
        this.addDialogVisible = false;
        this.addDialogLoading = false;
        onSuccess?.();
      },
      error: (error: HttpErrorResponse) => {
        this.addDialogLoading = false;
        this.notification.error('Ошибка', error.error);
      },
    };

    this.productsService.createProduct(payload).subscribe(observer);
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
      this.isAuthorized = true;
      this.isAdmin = userFromStorage.role === Role.ADMIN;
      this.fetchLinkedProducts(userFromStorage.username);
    }

    this.fetchCategories();
    this.fetchProducts([]);

    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  addToFavorites(productId: number): void {
    const observer: Partial<Observer<AddToFavoritesResponse>> = {
      next: (response: AddToFavoritesResponse) => {
        this.favorites = response.favorites;
        if (this.favoritesChecked) {
          this.products = this.favorites;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToFavorites(username, productId).subscribe(observer);
  }

  isProductInFavorites(productId: number): boolean {
    return this.favorites.some(
      (product: Product) => product.productId === productId
    );
  }

  addToCart(productId: number): void {
    const observer: Partial<Observer<AddToCartResponse>> = {
      next: (response: AddToCartResponse) => {
        this.cart = response.cart;
        this.notification.success('Операция выполнена', response.message);
      },
      error: (error: HttpErrorResponse) => {
        this.notification.error('Ошибка', error.error);
      },
    };
    const username = this.tokenStorage.getUser()!.username;
    this.userService.addToCart(username, productId).subscribe(observer);
  }

  isProductInCart(productId: number): boolean {
    return this.cart.some(
      (product: Product) => product.productId === productId
    );
  }

  // Add dialog

  showAddDialog(): void {
    this.addDialogVisible = true;
  }

  hideAddDialog(): void {
    this.addDialogVisible = false;
  }

  addDialogOk(): void {
    if (this.addForm.valid) {
      this.createProduct(this.addForm.value, () => {
        this.fetchProducts(this.selectedCategories);
      });
    } else {
      Object.values(this.addForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  addDialogCancel(): void {
    this.hideAddDialog();
  }

  afterAddDialogClose(): void {
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  //// Add dialog

  favoriteCheckedChange(checked: boolean): void {
    this.favoritesChecked = checked;
    if (checked) {
      this.selectedCategories = [];
      this.products = this.favorites;
    } else {
      this.fetchProducts([]);
    }
  }

  selectedCategoriesChange(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    this.fetchProducts(this.selectedCategories);
  }
}
