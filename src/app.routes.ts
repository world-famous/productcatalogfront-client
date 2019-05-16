import { Routes } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { Products } from './products';
import { Cart } from './cart';
import { AuthGuard } from './common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Home },
  { path: 'login',  component: Login },
  { path: 'register', component: Register },
  { path: 'home',   component: Home},
  { path: 'products',   component: Products },
  { path: 'cart',   component: Cart},
  { path: '**',     component: Login },
];
