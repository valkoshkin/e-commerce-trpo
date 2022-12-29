import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Observer } from 'rxjs';
import { User } from '../../common/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  loading: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const observer: Partial<Observer<any>> = {
        next: (response: User) => {
          this.loading = false;
          this.tokenStorage.saveToken(response.token);
          this.tokenStorage.saveUser(response);
          window.location.assign('/');
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.notification.error('Error', error.error.message || error.message);
        },
      };
      this.authService.login(this.loginForm.value).subscribe(observer);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
