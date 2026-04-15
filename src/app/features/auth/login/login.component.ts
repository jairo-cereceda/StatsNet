import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/atoms/input/input.component';
import { InputComponentInterface } from '../../../shared/components/atoms/input/input.interface';
import { TitleComponent } from '../../../shared/components/atoms/title/title.component';
import { TitleComponentInterface } from '../../../shared/components/atoms/title/title.interface';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationService } from '../../../core/services/validation/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, InputComponent, TitleComponent, RouterLink],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  loginTitle: TitleComponentInterface = {
    type: 'lg',
    text: 'Inicia Sesión',
  };

  get emailInput(): InputComponentInterface {
    return {
      label: 'Email:',
      placeholder: 'Introduce tu email',
      type: 'email',
      id: 'email',
      isRequired: true,
      errorMessage: this.validationService.getValidatorErrorMessage(this.loginForm.get('email')),
      formControlName: 'email',
    };
  }

  get passwordInput(): InputComponentInterface {
    return {
      label: 'Contraseña:',
      placeholder: 'Introduce tu contraseña',
      type: 'password',
      id: 'password',
      isRequired: true,
      errorMessage: this.validationService.getValidatorErrorMessage(this.loginForm.get('password')),
      formControlName: 'password',
    };
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      try {
        await this.authService.loginWithPassword(email!, password!);
        alert('Sesión iniciada!');
        this.router.navigate(['/']);
      } catch (error: any) {
        console.error('Error: ' + error.message);
      }
    }
  }
}
