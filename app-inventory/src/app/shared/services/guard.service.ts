import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { select, Store } from '@ngrx/store';
import {
  selectCurrentRole,
  selectIsAuthenticated,
} from '../../auth/store/reducer';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);
  isAuthenticated: boolean = false;
  role: string = '';

  role$ = this.store.select(selectCurrentRole);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const requiredAdmin = route.data['requiresAdmin'] || false;
    // this.role = await lastValueFrom(this.role$);
    this.role$.subscribe((role) => {
      this.role = role!;
    });

    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    if (requiredAdmin) {
      if (this.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    } else {
      if (this.isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    }
  }
}
