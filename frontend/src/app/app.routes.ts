import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Layout } from './pages/layout/layout';

import { ProductList } from './pages/product/product-list/product-list';

import { ProductForm } from './pages/product/product-form/product-form';

import { DiningTableList } from './pages/dining-table/dining-table-list/dining-table-list';

import { DiningTableForm } from './pages/dining-table/dining-table-form/dining-table-form';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],

    children: [
      {
        path: 'products',
        component: ProductList,
      },

      {
        path: 'products/new',
        component: ProductForm,
      },

      {
        path: 'products/edit/:id',
        component: ProductForm,
      },

      {
        path: 'dining-tables',
        component: DiningTableList,
      },

      {
        path: 'dining-tables/new',
        component: DiningTableForm,
      },

      {
        path: 'dining-tables/edit/:id',
        component: DiningTableForm,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
