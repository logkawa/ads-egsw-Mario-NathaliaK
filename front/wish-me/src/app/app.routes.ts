import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
// import { CategoriaComponent } from './pages/categoria/categoria.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
//   { path: 'categoria', component: CategoriaComponent },
  { path: '**', redirectTo: 'home' }
];
