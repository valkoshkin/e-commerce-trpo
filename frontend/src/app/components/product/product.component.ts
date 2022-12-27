import { Component, OnInit } from '@angular/core';
import { Product, Review, Role, User } from '../../common/types';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  reviews: Review[] = [];

  loading: boolean = true;

  isAdmin: boolean = false;

  deleteDialogVisible: boolean = false;

  editDialogVisible: boolean = false;

  reviewDialogVisible: boolean = false;

  editForm!: UntypedFormGroup;

  reviewForm!: UntypedFormGroup;

  constructor(
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder
  ) {} // + profile service

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      this.product = {
        productId: 1,
        name: 'Huawei Matebook D16',
        description: 'Ноутбук серого цвета',
        price: 64990,
        category: 'Ноутбуки',
      };
      // this.reviews = [
      //   {
      //     reviewId: 1,
      //     rating: 5,
      //     content: 'Норм тема',
      //     date: '5 минут назад',
      //     product: this.product,
      //     author: this.tokenStorage.getUser() || ({} as User),
      //   },
      //   {
      //     reviewId: 1,
      //     rating: 3,
      //     content: 'Так себе',
      //     date: '10 минут назад',
      //     product: this.product,
      //     author: this.tokenStorage.getUser() || ({} as User),
      //   },
      // ];
      this.isAdmin = this.tokenStorage.getUser()?.role === Role.ADMIN;

      this.editForm = this.fb.group({
        name: [this.product!.name, [Validators.required]],
        description: [this.product!.description, [Validators.required]],
        price: [this.product!.price, [Validators.required]],
      });

      this.reviewForm = this.fb.group({
        content: [undefined, []],
        rating: [null, [Validators.required]],
      });
    }, 1000);
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
