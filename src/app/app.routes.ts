import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/author-list/author-list.component').then(
        m => m.AuthorListComponent
      ),
    pathMatch: 'full',
  },
];
