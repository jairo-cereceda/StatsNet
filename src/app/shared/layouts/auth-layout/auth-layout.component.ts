import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [RouterOutlet],
})
export class AuthLayoutComponent {}
