import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequestInterface } from '../types/login.request.interface';
import { AuthResponseInterface } from '../types/auth.response.interface';
import { RegisterRequestInterface } from '../types/register.request.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ request: LoginRequestInterface }>(),
    'login succes': props<{ response: AuthResponseInterface }>(),
    'login failure': props<{ errors: any }>(),
    logout: emptyProps(),
    register: props<{ request: RegisterRequestInterface }>(),
    'register succes': props<{ response: AuthResponseInterface }>(),
    'register failure': props<{ errors: any }>(),
  },
});
