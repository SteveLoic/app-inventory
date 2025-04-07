import { Route } from '@angular/router';
import { DasboardComponent } from './components/dasboard/dasboard.component';

export const dashboard: Route[] = [
  {
    path: '',
    component: DasboardComponent,
  },
];
