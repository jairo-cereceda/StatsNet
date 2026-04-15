import { Component, signal } from '@angular/core';
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
import { ErrorService } from '../../../core/services/error/error.service';
import { ToastComponentInterface } from '../../../shared/components/molecules/toast/toast.interface';
import { ToastComponent } from '../../../shared/components/molecules/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, InputComponent, TitleComponent, RouterLink, ToastComponent],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
    private errorService: ErrorService,
    private router: Router,
  ) {}

  isToastShown = signal(false);

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

  toast: ToastComponentInterface = {
    type: 'error',
    content: '',
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.loginWithPassword(email!, password!);

      this.toast.content = '¡Sesión iniciada!';
      this.toast.type = 'success';

      this.isToastShown.set(true);
      setTimeout(() => {
        this.isToastShown.set(false);
        this.router.navigate(['/']);
      }, 2000);
    } catch (error: any) {
      this.toast.content = this.errorService.getAuthErrorMessage(error);
      this.toast.type = 'error';

      this.isToastShown.set(true);
      setTimeout(() => {
        this.isToastShown.set(false);
      }, 3000);

      console.error('Error: ' + error.message);
    }
  }
}
