import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Role } from '../../common/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: { title: string; content: string; productId: number }[] = [];

  favorites: number[] = [];

  categories: string[] = [];

  selectedCategories: string[] = [];

  favoritesChecked: boolean = false;

  loading: boolean = true;

  isAuthorized: boolean = false;

  isAdmin: boolean = false;

  addForm!: UntypedFormGroup;

  addDialogVisible: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    const userFromStorage = this.tokenStorage.getUser();
    if (userFromStorage) {
      this.isAuthorized = true;
      this.isAdmin = userFromStorage.role === Role.ADMIN;
    }
    setTimeout(() => {
      this.loading = false;
      this.products = [
        { title: 'Title 1', content: '10499', productId: 1 },
        { title: 'Title 1', content: '10499', productId: 2 },
        { title: 'Title 1', content: '10499', productId: 3 },
        { title: 'Title 1', content: '10499', productId: 4 },
        { title: 'Title 1', content: '10499', productId: 5 },
        { title: 'Title 1', content: '10499', productId: 6 },
        { title: 'Title 1', content: '10499', productId: 7 },
        { title: 'Title 1', content: '10499', productId: 8 },
        { title: 'Title 1', content: '10499', productId: 9 },
        { title: 'Title 1', content: '10499', productId: 10 },
        { title: 'Title 1', content: '10499', productId: 11 },
        { title: 'Title 1', content: '10499', productId: 12 },
        { title: 'Title 1', content: '10499', productId: 13 },
      ];
      this.favorites = [2, 3];
      this.addForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required]],
        category: [null, [Validators.required]],
      });
      this.categories = ['Ноутбуки', 'Смартфоны'];
    }, 2000);
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

    console.log(this.selectedCategories);
  }
}
