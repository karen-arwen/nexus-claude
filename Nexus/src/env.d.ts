/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ANTHROPIC_API_KEY?: string;
  readonly VITE_SPOTIFY_CLIENT_ID?: string;
  readonly VITE_DATA_MODE?: 'mock' | 'supabase';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
