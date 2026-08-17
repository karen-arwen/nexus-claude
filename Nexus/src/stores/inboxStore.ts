import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InboxItem {
  id: string;
  text: string;
  createdAt: string;
  context?: string; // de onde veio (cmdk, mobile, web...)
}

interface InboxState {
  items: InboxItem[];
  add: (text: string, context?: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const newId = () =>
  `in_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

export const useInboxStore = create<InboxState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: newId(),
          text: 'pesquisar sobre clean architecture em React',
          createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
          context: 'cmdk',
        },
        {
          id: newId(),
          text: 'mandar e-mail pra gerente sobre review',
          createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
        },
        {
          id: newId(),
          text: 'comprar presente da Carol (aniversário 15/05)',
          createdAt: new Date(Date.now() - 3600 * 1000 * 50).toISOString(),
        },
      ],

      add: (text, context) =>
        set({
          items: [
            {
              id: newId(),
              text,
              createdAt: new Date().toISOString(),
              context,
            },
            ...get().items,
          ],
        }),

      remove: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      clear: () => set({ items: [] }),
    }),
    { name: 'nexus-inbox' },
  ),
);
