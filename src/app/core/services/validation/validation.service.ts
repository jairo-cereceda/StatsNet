import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  getValidatorErrorMessage(control: AbstractControl | null, controlName?: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['email']) return 'El formato del email no es válido';
    if (errors['minlength'])
      return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['mismatch']) return 'Las contraseñas no coinciden';
    if (errors['pattern']) return 'El formato es incorrecto';

    return 'Campo no válido';
  }
}
