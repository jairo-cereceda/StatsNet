import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseClientService } from '../services/supabase-client.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = await authService.getUser();

  if (user) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
