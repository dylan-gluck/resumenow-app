import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from './database.types.ts'; // import generated types
import type { Resume } from '@/types/resume.js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
			resume?: Resume | null;
			profile?: Database['public']['Tables']['profiles']['Row'] | null;
			position?: Database['public']['Tables']['positions']['Row'] | null;
			positions?: Database['public']['Tables']['positions']['Row'][] | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
