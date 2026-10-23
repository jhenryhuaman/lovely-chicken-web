import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Layout } from './pages/layout/layout';

import { ProductList } from './pages/product/product-list/product-list';

import { ProductForm } from './pages/product/product-form/product-form';

import { DiningTableList } from './pages/dining-table/dining-table-list/dining-table-list';

import { DiningTableForm } from './pages/dining-table/dining-table-form/dining-table-form';

import { OrderList } from './pages/order/order-list/order-list';

import { OrderForm } from './pages/order/order-form/order-form';

import { OrderDetailList } from './pages/order/order-detail-list/order-detail-list';

import { OrderDetailForm } from './pages/order/order-detail-form/order-detail-form';

import { PaymentList } from './pages/payment/payment-list/payment-list';

import { PaymentForm } from './pages/payment/payment-form/payment-form';

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

      {
        path: 'orders',
        component: OrderList,
      },

      {
        path: 'orders/new',
        component: OrderForm,
      },

      {
        path: 'orders/edit/:id',
        component: OrderForm,
      },

      {
        path: 'order-details',
        component: OrderDetailList,
      },

      {
        path: 'order-details/new',
        component: OrderDetailForm,
      },

      {
        path: 'order-details/edit/:id',
        component: OrderDetailForm,
      },

      {
        path: 'payments',
        component: PaymentList,
      },

      {
        path: 'payments/new',
        component: PaymentForm,
      },

      {
        path: 'payments/edit/:id',
        component: PaymentForm,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
