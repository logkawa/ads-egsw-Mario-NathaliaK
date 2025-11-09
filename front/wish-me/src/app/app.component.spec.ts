import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav style="display:flex;gap:1rem;padding:1rem;background:#eee">
      <a routerLink="/login">🏠 Login</a>
    </nav>
    <main style="padding:1rem">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
