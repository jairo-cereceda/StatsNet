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
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationService } from '../../../core/services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, InputComponent, TitleComponent, RouterLink],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private validationService: ValidationService,
  ) {}

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
      console.log('¡Cuenta creada!');
    } catch (error: any) {
      console.error('Error: ' + error.message);
    }
  }
}
