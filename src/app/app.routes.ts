import { Routes } from '@angular/router';

import { Login } from './component/login/login';
import { Dashboard } from './component/dashboard/dashboard';
import { AuthGuard } from './Services/auth.guard';
import { Productlist } from './component/productlist/productlist';
import { AddProductPage } from './component/add-product-page/add-product-page';
import { Unauthorised } from './component/unauthorised/unauthorised';
export const routes: Routes = [
     { path: 'login', component: Login },
  { path: 'unauthorised', component: Unauthorised },
  {
    path: 'dashboard',
    component: Dashboard,
     loadChildren: () => import('./component/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] } // Accessible by both user and admin
  },
  {
    path: 'product-list',
    component: Productlist,
    loadChildren: () => import('./component/productlist/productlist').then(m => m.Productlist),
    canActivate: [AuthGuard],

    data: { roles: ['user', 'admin'] } // Accessible by both user and admin
  },
{
    path: 'add-page',
        loadChildren: () => import('./component/add-product-page/add-product-page').then(m => m.AddProductPage),

    component: AddProductPage,
    canActivate: [AuthGuard],        // 1. Must be authenticated
    data: { role: 'admin' }          // 2. Must have the 'admin' role
  },
  { path: '', redirectTo: '/sidebar', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' } // Handle unmatched routes

];
