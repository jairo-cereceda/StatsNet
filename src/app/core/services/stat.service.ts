import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseClientService } from './supabase-client.service';
import { Database } from '../models/database.types';

type Stat = Database['public']['Tables']['stats']['Row'];

@Injectable({
  providedIn: 'root',
})
export class StatService {
  constructor(private supabaseService: SupabaseClientService) {}

  getStatsByUsername(username: string): Observable<Stat[]> {
    const query = this.supabaseService.supabase
      .from('stats')
      .select(
        `
        *,
        profiles!inner(username)
      `,
      )
      .eq('profiles.username', username)
      .order('created_at', { ascending: false });

    return from(query).pipe(
      map((res) => {
        if (res.error) throw res.error;
        return res.data || [];
      }),
    );
  }
}
