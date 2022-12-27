import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {Product, Role} from '../../common/types';
import {ProductsService} from "../../services/products/products.service";
import {Observer} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  productsLoading: boolean = false;

  favorites: number[] = [];

  categories: string[] = [];

  categoriesLoading: boolean = false;

  selectedCategories: string[] = [];

  favoritesChecked: boolean = false;

  isAuthorized: boolean = false;

  isAdmin: boolean = false;

  addForm!: UntypedFormGroup;

  addDialogVisible: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private notification: NzNotificationService
  ) {
  }

  private fetchCategories() {
    this.categoriesLoading = true;
    const observer: Partial<Observer<any>> = {
        next: (response: string[]) => {
          this.categories = response;
          this.categoriesLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.categoriesLoading = false;
          this.notification.error('Error', error.error);
        }
      }
    ;
    this.productsService.fetchCategories().subscribe(observer);
  }

  private fetchProducts(categories: string[]) {
    this.productsLoading = true;
    const observer: Partial<Observer<any>> = {
        next: (response: Product[]) => {
          this.products = response;
          this.productsLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.productsLoading = false;
          this.notification.error('Error', error.error);
        }
      }
    ;
    this.productsService.fetchProducts(categories).subscribe(observer);
  }

  ngOnInit(): void {
    const userFromStorage = this.tokenStorage.getUser();
    if (userFromStorage) {
      this.isAuthorized = true;
      this.isAdmin = userFromStorage.role === Role.ADMIN;
    }

    this.fetchCategories();
    this.fetchProducts([]);

    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });

    // this.favorites = [2, 3];
  }

  toggleFavorite(itemId: number): void {
    const index = this.favorites.indexOf(itemId);
    if (index == -1) {
      console.log(`Add to favorite item with id ${itemId}`);
      this.favorites.push(itemId);
    } else {
      console.log(`Remove from favorite item with id ${itemId}`);
      this.favorites.splice(index, 1);
    }
  }

  addToCart(itemId: number): void {
    console.log(`Add to cart item with id ${itemId}`);
  }

  // Add dialog

  showAddDialog(): void {
    this.addDialogVisible = true;
  }

  hideAddDialog(): void {
    this.addDialogVisible = false;
  }

  addDialogOk(): void {
    console.log(`Add product`);
  }

  editDialogCancel(): void {
    this.hideAddDialog();
  }

  afterEditDialogClose(): void {
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