import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getAuthErrorMessage(error: any): string {
    const msg = error?.message || '';

    switch (true) {
      case msg.includes('User already registered'):
        return 'Este email ya está registrado';

      case msg.includes('Database error saving new user'):
        return 'El nombre de usuario ya está en uso o hubo un error en el servidor';

      case msg.includes('Invalid login credentials'):
        return 'Email o contraseña incorrectos';

      case msg.includes('email rate limit exceeded'):
        return 'Ha ocurrido un problema, por favor inténtelo más tarde';

      case msg.includes('Email not confirmed'):
        return 'Email no verificado, por favor revisa tu correo';

      default:
        return 'Ha ocurrido un error inesperado';
    }
  }
}
