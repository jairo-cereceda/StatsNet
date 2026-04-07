import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/atoms/input/input.component';
import { InputComponentInterface } from '../../../shared/components/atoms/input/input.interface';
import { TitleComponent } from '../../../shared/components/atoms/title/title.component';
import { TitleComponentInterface } from '../../../shared/components/atoms/title/title.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, InputComponent, TitleComponent, RouterLink],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });

  registerTitle: TitleComponentInterface = {
    type: 'lg',
    text: 'Regístrate',
  };

  emailInput: InputComponentInterface = {
    label: 'Email:',
    placeholder: 'Introduce tu email',
    type: 'email',
    id: 'email',
    formControlName: 'email',
  };

  passwordInput: InputComponentInterface = {
    label: 'Contraseña:',
    placeholder: 'Introduce tu contraseña',
    type: 'password',
    id: 'password',
    formControlName: 'password',
  };

  repeatPasswordInput: InputComponentInterface = {
    label: 'Confirmar contraseña:',
    placeholder: 'Repite tu contraseña',
    type: 'password',
    id: 'repeat-password',
    formControlName: 'repeatPassword',
  };
}
