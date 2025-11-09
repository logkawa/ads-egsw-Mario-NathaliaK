// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h1>Bem-vinda à página Home 💫</h1>
    <p>Esse é o início do seu app Angular standalone!</p>
  `
})
export class LoginComponent {}
