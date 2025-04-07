import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/register.request.interface';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting } from '../../store/reducer';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'inv-app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
  });

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.required]],
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const registerUserRequest: RegisterRequestInterface = {
        ...this.form.getRawValue(),
        userRole: 'ADMIN',
      };

      this.store.dispatch(
        authActions.register({ request: registerUserRequest })
      );
    }
  }
}
