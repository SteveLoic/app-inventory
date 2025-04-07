import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'inv-app-profile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  store = inject(Store);

  data$ = combineLatest({
    user: this.store.select(selectCurrentUser),
  });
}
