import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponentInterface } from '../../../shared/components/atoms/input/input.interface';
import { TitleComponent } from '../../../shared/components/atoms/title/title.component';
import { TitleComponentInterface } from '../../../shared/components/atoms/title/title.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationService } from '../../../core/services/validation/validation.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../../../shared/components/molecules/toast/toast.component';
import { InputComponent } from '../../../shared/components/atoms/input/input.component';
import { ToastComponentInterface } from '../../../shared/components/molecules/toast/toast.interface';
import { ErrorService } from '../../../core/services/error/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, InputComponent, TitleComponent, RouterLink, ToastComponent],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
    private errorService: ErrorService,
    private router: Router,
  ) {}

  isToastShown = signal(false);

  registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    repeatPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  registerTitle: TitleComponentInterface = {
    type: 'lg',
    text: 'Regístrate',
  };

  toast: ToastComponentInterface = {
    type: 'error',
    content: '',
  };

  get userInput(): InputComponentInterface {
    return {
      label: 'Username:',
      placeholder: 'Introduce tu nombre de usuario',
      isRequired: true,
      type: 'text',
      id: 'text',
      errorMessage: this.validationService.getValidatorErrorMessage(
        this.registerForm.get('username'),
      ),
      formControlName: 'username',
    };
  }

  get emailInput(): InputComponentInterface {
    return {
      label: 'Email:',
      placeholder: 'Introduce tu email',
      type: 'email',
      isRequired: true,
      id: 'email',
      errorMessage: this.validationService.getValidatorErrorMessage(this.registerForm.get('email')),
      formControlName: 'email',
    };
  }

  get passwordInput(): InputComponentInterface {
    return {
      label: 'Contraseña:',
      placeholder: 'Introduce tu contraseña',
      type: 'password',
      isRequired: true,
      id: 'password',
      errorMessage: this.validationService.getValidatorErrorMessage(
        this.registerForm.get('password'),
      ),
      formControlName: 'password',
    };
  }

  get repeatPasswordInput(): InputComponentInterface {
    return {
      label: 'Confirmar contraseña:',
      placeholder: 'Repite tu contraseña',
      isRequired: true,
      type: 'password',
      id: 'repeat-password',
      errorMessage: this.validationService.getValidatorErrorMessage(
        this.registerForm.get('repeatPassword'),
      ),
      formControlName: 'repeatPassword',
    };
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, repeatPassword, username } = this.registerForm.value;

    if (password !== repeatPassword) {
      this.registerForm.get('repeatPassword')?.setErrors({ mismatch: true });
      return;
    }

    try {
      await this.authService.signUp(email!, password!, username!, username!);
      this.toast.content = '¡Cuenta creada!';
      this.toast.type = 'success';

      this.isToastShown.set(true);
      setTimeout(() => {
        this.isToastShown.set(false);
        this.router.navigate(['/auth/login']);
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
