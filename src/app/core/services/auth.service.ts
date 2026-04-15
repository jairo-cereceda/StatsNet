import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';
import { Database } from '../models/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userProfile = new BehaviorSubject<Profile | null>(null);

  userProfile$ = this.userProfile.asObservable();

  constructor(
    private supabaseService: SupabaseClientService,
    private router: Router,
  ) {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.fetchProfile(session.user.id);
      } else {
        this.userProfile.next(null);
      }
    });
  }

  private async fetchProfile(userId: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error) {
      this.userProfile.next(data);
    }
  }

  get currentUserValue() {
    return this.userProfile.value;
  }

  async loginWithPassword(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async getUser() {
    const { data, error } = await this.supabaseService.supabase.auth.getUser();
    if (error) return null;
    return data.user;
  }

  async logout() {
    await this.supabaseService.supabase.auth.signOut();
    this.router.navigate(['/auth/login']);
  }

  async signUp(email: string, password: string, username: string, displayName: string) {
    const { data, error } = await this.supabaseService.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          display_name: displayName,
        },
      },
    });

    if (error) throw error;

    if (data.user && data.user.identities && data.user.identities.length === 0) {
      throw { message: 'User already registered' };
    }
    console.log('Registro exitoso, revisa tu correo.');
    return data;
  }
}
