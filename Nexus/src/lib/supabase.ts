import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * Funciona em "modo mock" enquanto VITE_SUPABASE_URL/ANON_KEY não estão configurados —
 * stores usam dados locais até você criar o projeto.
 *
 * Quando criar:
 *   1. https://supabase.com → New Project
 *   2. Settings → API → Copy URL e anon/public key
 *   3. Cole em .env.local
 *   4. Defina VITE_DATA_MODE=supabase
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_CONFIGURED = Boolean(url && key);

export const DATA_MODE: 'mock' | 'supabase' =
  import.meta.env.VITE_DATA_MODE === 'supabase' && SUPABASE_CONFIGURED
    ? 'supabase'
    : 'mock';

export const supabase: SupabaseClient | null = SUPABASE_CONFIGURED
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

if (!SUPABASE_CONFIGURED && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.info(
    '%c[NEXUS] Modo Mock ativo — configure .env.local pra ligar Supabase',
    'color: #8b5a3c; font-weight: bold;',
  );
}
