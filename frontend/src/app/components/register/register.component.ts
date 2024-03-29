import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageWrapper } from '../../common/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: UntypedFormGroup;

  loading: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.loading = true;
      const observer: Partial<Observer<MessageWrapper>> = {
        next: (response: MessageWrapper) => {
          this.loading = false;
          this.notification.success('Операция выполнена', response.message);
          this.router.navigateByUrl('/login').then();
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.notification.error(
            'Ошибка',
            error.error.message || error.message
          );
        },
      };
      this.authService
        .register(this.registrationForm.value)
        .subscribe(observer);
    } else {
      Object.values(this.registrationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
