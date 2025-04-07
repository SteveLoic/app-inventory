import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting } from '../../store/reducer';
import { LoginRequestInterface } from '../../types/login.request.interface';
import { authActions } from '../../store/actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'inv-app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
  });

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const userLoginRequest: LoginRequestInterface = this.form.getRawValue();
      this.store.dispatch(authActions.login({ request: userLoginRequest }));
    }
  }
}
